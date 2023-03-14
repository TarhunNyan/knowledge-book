// const runType = process.argv[2]==='--dev' ? 'dev' : 'build';
const runType = process.argv[2]==='--dev' ? 'dev' : 'dev';
const saveFolder = runType==='dev' ? 'md' : 'dist';

var MarkdownIt = require("markdown-it");
var MarkdownItKatex = require('@iktakahiro/markdown-it-katex');
var MarkdownItHighlights = require('markdown-it-highlightjs');

const md = new MarkdownIt();
md.use( MarkdownItKatex );
md.use( MarkdownItHighlights );

const fs = require('fs');
const path = require('path');
const fp = require('./fileProcess');

// TODO: тупо неправильно работает
function pathsFilter(paths_inp, paths_out) {
    function pathsFilterDecoratable( paths_inp, paths_out, result=[] ) {
        for (let i = 0; i < paths_inp.length; i++) {
            const inpEl = paths_inp[i];
            // Skip .html files
            if( path.extname( inpEl.dir )==='.html' ) { continue; }
            // Delete format .md
            const inpElFilepath = inpEl.type==='dir' ? inpEl.dir : fp.edpDelFileExt( inpEl.dir )
            let j;
            for(let j=0; j < paths_out.length; j++) {
                const outEl = paths_out[j];
                // Delete format .html(or another)
                let outElFilepath = outEl.type==='dir' ? outEl.dir : fp.edpDelFileExt( outEl.dir )

                // Skip current file
                if( path.extname( outEl.dir )==='.md' && inpElFilepath === outElFilepath ) { outElFilepath+='.md' }

                // If one name directory, then recursive call this function
                if( inpElFilepath === outElFilepath && inpEl.type === 'dir') {
                    result = pathsFilterDecoratable( inpEl.files, outEl.files, result );
                    break;
                }

                console.log( '-------' );
                console.log( inpElFilepath );
                console.log( outElFilepath );
                // If one name file and .md edite after build in html, write filepath to result
                if( inpElFilepath === outElFilepath && (inpEl.lastEdit > outEl.lastEdit || (!(inpEl.lastEdit > outEl.lastEdit) && !(inpEl.lastEdit < outEl.lastEdit))) && inpEl.type === 'file') {
                    result.push( inpEl.filepath )
                    break;
                }

                // If one files or directories have one name
                // And previous conditions not work
                // We break it
                if( inpElFilepath === outElFilepath ) { break; }
                // If file or directory is not exist in dist
                // We write filepath to result 
                if ( j === paths_out.length && inpEl.type === 'file') { 
                    result.push( inpEl.filepath ) 
                }
                if ( j === paths_out.length && inpEl.type === 'dir') { 
                    result = pathsFilterDecoratable( inpEl.files, [{dir:'', filepath:'', type:'', files:[]}], result ); 
                }
            }
        }
        return result;
    }
    return pathsFilterDecoratable(paths_inp, paths_out);
}

const paths_inp = fp.getDirListSync('./md', { getLastEdit:true });
const paths_out = fp.getDirListSync('./' + saveFolder, { getLastEdit:true });
paths_inp.push({
    dir: 'static',
    filepath: path.resolve( __dirname, '..', 'md', 'static' ),
    lastEdit: 0,
    type: 'dir',
    files: fp.getDirListSync('./lib/static', { getLastEdit:true })
})

if(paths_inp === -1) {
    throw new Error( `Directory md is not find. Create md folder and set .md files` )
}

if(paths_out === -1) {
    throw new Error( 'Error in getDirListSync function' );
}

var paths_check = pathsFilter( paths_inp, paths_out)
var paths_check_out = paths_check.map(
    (filepath) => {
        let result = filepath;
        const basePath = path.resolve( __dirname, '..' ).split( path.sep );

        result = fp.edpChangeSubPath( result, [ ...basePath, 'md'], [ ...basePath, saveFolder] );
        result = fp.edpChangeSubPath( result, [ ...basePath, 'lib'], [ ...basePath, saveFolder] );
        result = fp.edpChangeFileExt( result, '.md', '.html' );
        return result;
    }
)


var paths_css = paths_check_out.map(
    (filepath) => path.relative( fp.edpDelFileName( filepath ), path.resolve( __dirname, '..', saveFolder, 'static', 'style.css '))
)

function asyncProc(paths_inp, paths_out, paths_css) {
    function asyncProcDecoratable(path_inp, path_out, path_css) {
        return fp.readFile(path_inp).then((html) => {
            // create directory to .html
            return new Promise((resolve, reject) => {
                // Delete last elelemt from path
                path_out_dir = fp.edpDelFileName( path_out );
                fs.mkdirSync(path_out_dir, { recursive: true });
                resolve( html );
            });
        }).then((data) => {
            return new Promise((resolve, reject) => {
                if (path.extname(path_inp)==='.md') { resolve(data); }
                else { reject(data); }
            });
        }).then(
            // Render .md to .html
            (data) => {
                const html = md.render(data)
                return html;
            }
        ).then((html) => {
            // In .html replace locale link from .md files to .html files
            return html.replace(/(href="\..*)\.md(">)/g, '$1.html$2');
        }).then((html) => {
            // In .html svg from text to normal tag
            const regexp = /(&lt;svg xmlns=&quot;http:\/\/www\.w3\.org\/2000\/svg&quot;)((.|\n)*)(&lt;\/svg&gt;)/g;
            return html.replaceAll(regexp, (match) => {
                const result = match.replaceAll(/&lt;/g, '<').replaceAll(/&gt;/g, '>').replaceAll(/&amp;/g, '&').replaceAll(/&quot;/g, '"').replaceAll(/&apos;/g, "'").replaceAll(/&cent;/g, '¢').replaceAll(/&pound;/g, '£').replaceAll(/&yen;/g, '¥').replaceAll(/&euro;/g, '€').replaceAll(/&copy;/g, '€').replaceAll(/&reg;/g, '®')
                return result
            })
        }).then((html) => {
            // In .html create anchors for h1 and h2 tags. It need for relative link
            const regexp = /(<h[12])(>)(.*)(<\/h[12]>)/g;
            return html.replaceAll(regexp, (match, preTag, preTag_end, innerHtml, afterTag) => {
                const id = innerHtml
                            .toLowerCase()
                            .replaceAll(/&lt;|&gt;|&amp;|&quot;|&apos;|&cent;|&pound;|&yen;|&euro;|&copy;|&reg;/g, '')
                            .replaceAll(/\s/g, '-')
                            .replaceAll(/[@#'!&(),\[\].+=*:;\/\\`<>\s{}$%]/g, '') // -, _ - no need to delete
                return preTag + ' id="' + id + '"' + preTag_end + innerHtml + afterTag
            })
        }).then((html) => {
            // In .html add css
            return `<link rel="stylesheet" href="${path_css}">` + html
        }).then((html) => {
            // In .html append left side menu
            const regTagHeader = /<h([12]) id="(.*)">(.*)<\/h[12]>/g;
            let headers = [];
            let foundHeader = regTagHeader.exec(html);
            while( foundHeader != null ) {
                if(foundHeader[1] === '1') {
                    headers.push([ foundHeader[2], foundHeader[3] ])
                }
                if(foundHeader[1] === '2') {
                    headers[headers.length - 1].push([ foundHeader[2], foundHeader[3] ])
                }
                foundHeader = regTagHeader.exec(html);
            }

            let result = '<ul>';
            headers.forEach(( header ) => {
                result += `<a href="#${header[0]}"><li>${header[1]}</li></a>`;
                if(header.length > 2) {
                    result += '<ul>';
                    for(let i=2; i < header.length; i++) {
                        result += `<a href="#${header[i][0]}"><li>${header[i][1]}</li></a>`;
                    }
                    result += '</ul>'
                }
            })
            result += '</ul>'
            
            return `<input type="checkbox" id="isClose"></input><div class="left-menu"><div class="control-panel"><label for="isClose"><div class="isClose"></div></label></div><div class="left-side-menu">${result}</div></div><div class="main">${html}</div>`
        }).then((html) => {
            // Write html in .html
            return fp.writeFile(
                path_out,
                html
            )
        }).catch((data) => {
            // Write data in path_out
            return fp.writeFile(
                path_out,
                data
            )
        })
    };

    for(let i=0; i<paths_inp.length; i++) {
        asyncProcDecoratable( paths_inp[i], paths_out[i], paths_css[i] )
    }
}
asyncProc(paths_check, paths_check_out, paths_css)