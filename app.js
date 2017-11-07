var $ = require('jquery');
var Nightmare = require('nightmare');
    nightmare = Nightmare();

var city = process.argv[2];
var term = process.argv[3];

console.log(city);
console.log(term);

nightmare
    .goto('https://' + city + '.craigslist.org/d/atvs%2C-utvs%2C-snowmobiles/search/sna')
    .wait(2000)
    .evaluate(function(param){
            var snowmobiles = [];
            $('.hdrlnk').each(function(){
                item = {};
                var title = $(this).text();
                if (title.toLowerCase().indexOf(param) != -1)
                {
                    item['title'] = $(this).text();
                    item['link'] = $(this).attr('href');
                    snowmobiles.push(item);
                }
            });
            return snowmobiles;
        }, term
    )
    .end()
    .then(function(result){
        console.log(result.length + " " + term.toUpperCase() + " Found:");
        for(snowmobile in result){
            console.log(result[snowmobile].title);
            console.log(result[snowmobile].link);
            console.log('\n');
        }
    })
