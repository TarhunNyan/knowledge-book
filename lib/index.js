const args = require("cstm-argsparser").default();
const argsDefault = {};
let options = { ...argsDefault, ...args };

const fp = require('cstm-fileprocess');
const _ = require('cstm-jssupport');
const MarkdownIt = require("markdown-it");
const hideFolder = fp.path__getSeparator() + '.';
const md = (new MarkdownIt({ html: true, }))
    .use(require('@iktakahiro/markdown-it-katex'))
    .use(require('markdown-it-highlightjs'));


function compileProject__before(pathFrom, pathTo) {
    if (!fp.path__isExist(pathFrom)) { fp.node__create(pathFrom); }
    if (!fp.path__isExist(pathTo)) { fp.node__create(pathTo); }
    return true;
};

function compileProject(pathFrom, pathTo) {
    compileProject__before(pathFrom, pathTo);

    let pathsFile = compileProject__getPathsFile(pathFrom, pathTo);
    let isMakeUpdate = compileProject__isMakeUpdate(pathFrom, pathTo, pathsFile);
    compileProject__doCompile(pathFrom, pathTo, pathsFile, isMakeUpdate);
}

function compileProject__getPathsFile(pathFrom, pathTo) {
    let pathsFile = fp.dir__getFileList_Recursive(pathFrom);

    pathsFile = pathsFile.filter(el => {
        // Если у файла .html в папке нет одноименного собрата .md 
        if (fp.path__getExt(el) === '.html' && pathsFile.indexOf(fp.path__replaceExt(el, 'md')) != -1) { return false; }
        if (el.indexOf(hideFolder) != -1) { return false; }
        return true;
    });
    pathsFile = pathsFile.map(el => fp.path__replaceDir(el, pathFrom, ''));

    return pathsFile;
}

function compileProject__isMakeUpdate(pathFrom, pathTo, pathsFile) {
    const isMakeUpdate = pathsFile.map(el => {
        const pathF = fp.path__join([pathFrom, el]);
        const pathT = compileProject__generatePath(pathF, fp.path__join([pathTo, el]));
        const pathF_lastEdit = fp.path__statLastEdit(pathF);
        const pathT_lastEdit = fp.path__statLastEdit(pathT);

        if (pathT_lastEdit == undefined) { return true }
        if (pathT_lastEdit.getTime() >= pathF_lastEdit.getTime()) { return false }

        return true;
    });

    return isMakeUpdate;
}

function compileProject__doCompile(pathFrom, pathTo, pathsFile, isMakeUpdate) {

    _.for__simple(isMakeUpdate, (i, el) => {

        if (el == false) { return; }

        const pathN = pathsFile[i];
        const pathS = compileProject__generatePathStatic(pathsFile[i]);
        const pathF = fp.path__join([pathFrom, pathN]);
        const pathT = compileProject__generatePath(pathF, fp.path__join([pathTo, pathN]));

        const data = compileProject__convert(pathF, pathT, { pathStaticCSS: pathS[0], pathStaticIcon: pathS[1] });
        const isExist = fp.path__isExist(pathT);

        if (isExist) { fp.file__write(pathT, data); }
        if (!isExist) { fp.node__create(pathT, data, true) }
    })

    return true;
}

function compileProject__generatePathStatic(pathNew) {
    let length = fp.path__getLength(pathNew) - 1;

    let arr = Array(length).fill('..');
    const arrCSS = ['./', ...arr, 'static', 'style.css'];
    const arrIcon = ['./', ...arr, 'static', 'icon.svg'];
    return [fp.path__join(arrCSS), fp.path__join(arrIcon)];
}

function compileProject__generatePath(pathFrom, pathTo) {
    const extFrom = fp.path__getExt(pathFrom);
    if (extFrom === '.md') { return fp.path__replaceExt(pathTo, 'html') }
    return pathTo;
}

function compileProject__convert(pathFrom, pathTo, options) {
    const extFrom = fp.path__getExt(pathFrom), extTo = fp.path__getExt(pathTo);
    let data, encoding = 'utf-8';
    if (['.md', '.html'].indexOf(extFrom) === -1) { encoding = ''; }
    if (true) { data = fp.file__read(pathFrom, encoding); }
    if (extFrom === '.md' && extTo === '.html') {
        return `<head>
            <link rel="stylesheet" href="${options.pathStaticCSS}">
            <link rel="icon" href="${options.pathStaticIcon}">
        </head>
        <body>` + compileProject__convert_mdToHTML(data) + '</body>'
    }

    return data;
}

function compileProject__convert_mdToHTML(data) {
    // Рендерим markdown в html
    data = md.render(data);
    // В .html заменяем ссылки которые вели к .md файлам, на .html файлы
    data = data.replace(/(href="\..*)\.md(">|#.*">)/g, '$1.html$2');
    // В .html заменяем svg который воспринимался как plain text, на нормальный svg тег
    const regexpSVG = /(&lt;svg xmlns=&quot;http:\/\/www\.w3\.org\/2000\/svg&quot;)((.|\n)*)(&lt;\/svg&gt;)/g;
    data = data.replaceAll(regexpSVG, (match) => {
        return match
            .replaceAll(/&lt;/g, '<')
            .replaceAll(/&gt;/g, '>')
            .replaceAll(/&amp;/g, '&')
            .replaceAll(/&quot;/g, '"')
            .replaceAll(/&apos;/g, "'")
            .replaceAll(/&cent;/g, '¢')
            .replaceAll(/&pound;/g, '£')
            .replaceAll(/&yen;/g, '¥')
            .replaceAll(/&euro;/g, '€')
            .replaceAll(/&copy;/g, '€')
            .replaceAll(/&reg;/g, '®');
    })
    // В .html создаем якори для h1 и h2 тегов. Для удобного использования relative link
    const regexpHeading = /(<h[12])(>)(.*)(<\/h[12]>)/g;
    data = data.replaceAll(regexpHeading, (match, preTag, preTag_end, innerHtml, afterTag) => {
        const id = innerHtml
            .toLowerCase()
            .replaceAll(/&lt;|&gt;|&amp;|&quot;|&apos;|&cent;|&pound;|&yen;|&euro;|&copy;|&reg;/g, '')
            .replaceAll(/\s/g, '-')
            .replaceAll(/[@#'!&(),\[\].+=*:;\/\\`<>\s{}$%]/g, '');
        return preTag + ' id="' + id + '"' + preTag_end + innerHtml + afterTag;
    });
    // Добавляем меню навигации в файл
    const regexpHeadingID = /<h([12]) id="(.*)">(.*)<\/h[12]>/g;
    let headers = [];
    for (let fh = regexpHeadingID.exec(data); fh != null; fh = regexpHeadingID.exec(data)) {
        const headLevel = fh[1], headID = fh[2], headContent = fh[3]
        if (headLevel === '1') { headers.push([headID, headContent]) }
        if (headers.length === 0) { headers.push(["content", "content"]) }
        if (headLevel === '2') { headers.at(-1).push([headID, headContent]) }
    }
    if (headers.length === 0) { headers.push(["content", "content"]) }

    let menu = '<ul>';
    for (let i = 0; i < headers.length; i++) {
        const head = headers[i];
        const headContent = head[1], headID = head[0];
        let menuSecond = '';

        if (true) { menu += `<a href="#${headID}"><li>${headContent}</li></a>`; }
        if (head.length > 2) { for (let j = 2; j < head.length; j++) { menuSecond += `<a href="#${head[j][0]}"><li>${head[j][1]}</li></a>`; } }
        if (menuSecond != '') { menu += '<ul>' + menuSecond + '</ul>' }
    }
    menu += '</ul>'

    // Объединяем все в одну страницу
    let title = headers[0][1]
    const jsCode__setTitle = `<script>document.title = "${title}";</script>`
    const jsCode__setAnchorSettings = `<script>document.addEventListener('click', (event)=>{const anchor=event.target.closest('a');if (anchor != null && anchor.getAttribute('href')[0] === '#') {event.preventDefault();let newHref = location.href;const index = newHref.indexOf('#');if (index != -1) {newHref = newHref.slice(0, index);}newHref += event.target.closest('a').getAttribute('href');location.replace(newHref);}})</script>`
    return `${jsCode__setTitle}${jsCode__setAnchorSettings}<input type = "checkbox" id = "isClose" /> <input type = "checkbox" id = "isHome" /> <div class="left-menu" > <div class="control-panel" > <label for= "isClose" > <div class= "isClose icon" ></div ></label ><!-- < label for= "isHome" > div class= "isHome icon" ></div ></label > --></div><div class="left-side-menu">${menu}</div></div><div class="main">${data}</div>`
}

if (!_.if__isStringContent(options['folder-from'])) { console.log('Неуказана папка откуда брать файлы. Чтобы указать используйте: node ./ --folder-from \'<path>\''); }
if (!_.if__isStringContent(options['folder-to'])) { console.log('Неуказана папка куда записывать файлы. Чтобы указать используйте: node ./ --folder-to \'<path>\''); }
if (_.if__isStringContent(options['folder-from']) && _.if__isStringContent(options['folder-to'])) { console.log('Компиляция...'); compileProject(options['folder-from'], options['folder-to']); }
