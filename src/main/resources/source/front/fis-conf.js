var path = "";
//var path = "";


fis.hook('module', {
    mode: 'mod'
});

fis.match("components/**", {
    isMod: true,
    release: path+'/static/$0'
});

fis.match("data/**", {
    release: path+'/$0'
});

fis.match("doc/**", {
    release: false
});

fis.match("/component_modules/*.js", {
    isMod: true,
    useMap: true,
    release: path+'/static/$0'
});

fis.match(/^\/components\/component\/(.*)$/i, {
    id : '$1',
    useHash:false
});


fis.match("components/page/(*.html)",{
    release: path+'/$1',
    useCache : false
});

//fis.match('**/*.less', {
//    rExt: '.css', // from .scss to .css
//    parser: fis.plugin('less2', {
//        //fis-parser-sass option
//    })
//});

fis.match(/static\/images\/.*\.(jpeg|jpg|png)$/,{
    useHash: false,
    release: path+'/$0'
});

fis.match('::packager', {
    // npm install [-g] fis3-postpackager-loader
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
}).match('**/*.css', {
    packTo: '/static/pkg/all.css'//css鎵撴垚涓�涓寘
});

fis.match("/static/**/*.*",{
    useHash:false,
    release:path+"/$0"
});

//fis.match("*.{js,css,png}",{
//    useHash:true
//})
fis.media('prod')
    .match('component_modules/*.js',{
        packTo: '/static/pkg/common.js'
    })
    .match('components/**/*.js',{
        packTo: '/static/pkg/app.js'
    })
    .match('/static/pkg/*.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('/static/pkg/**',{
        useHash:true
    });