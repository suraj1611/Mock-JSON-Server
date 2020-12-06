const authorRoutes = (app,fs) => {

    const data = "./store.json";

    // GET Request
    app.get('/authors', (req,res)=> {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            let authors = JSON.parse(data);
            res.send(authors.authors);
        });
    });

    // GET using ID
    app.get('/authors/:id', (req,res)=> {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            const id = req.params.id;
            let authors = JSON.parse(data);
            res.send(authors.authors[id]);
        });
    });

    // POST request
    app.post('/authors', (req, res) => {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            let authors = JSON.parse(data);
            let newdata = req.body;
            authors.authors.push(newdata);
            fs.writeFile('./store.json' , JSON.stringify(authors), 'utf-8', function(err) {
                if (err) throw err
            })   
            res.send('New post added');      
        });
    });

    // DELETE request
    app.delete('/authors/:id', (req,res) => {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            const id = req.params.id;
            let authors = JSON.parse(data);
            let newdata = {...authors};
            let filteredAuthors = authors.authors.filter((a) => a.id != id);
            newdata.authors = filteredAuthors;
            fs.writeFile('./store.json' , JSON.stringify(newdata), 'utf-8', function(err) {
                if (err) 
                throw err
            })
            res.send('Author deleted');
                   
        });
    });

    // PUT request
    app.put('/authors/:id', (req,res) => {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            const id = req.params.id;
            let authors = JSON.parse(data);
            let newdata = req.body;
            authors.authors[id] = newdata;
            fs.writeFile('./store.json' , JSON.stringify(authors), 'utf-8', function(err) {
                if (err) throw err
            })
            res.send('Author Modified');          
        });
    });

    //Filtering at entity level

    app.get('/filterAuthors', (req,res) => {

        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            
        const x  = req.query;
        console.log(x.title);

        let authors = JSON.parse(data);
        let results = authors.authors;

        id = x.id;
        first_name = x.first_name;
        last_name = x.last_name;
        views = x.views;

        if(id)
        {
            results = results.filter(r => r.id === id);
        }

        if(first_name)
        {
            results = results.filter(r => r.first_name === first_name);
        }

        if(last_name)
        {
            results = results.filter(r => r.last_name === last_name);
        }

        if(views)
        {
            results = results.filter(r => r.views === views);
        }

        res.send(results);
            
        });

    });


    //Sorting at entity level :
    app.get('/sortAuthors', (req,res)=> {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
                
            const id = req.params.id;
            let authors = JSON.parse(data);

            const x  = req.query;
            let results = authors.authors;
            let _sort = x._sort;
            let _order = x._order;

            if(_order === "asc")
            results.sort((a,b) => (a[_sort]>b[_sort])? 1:-1);
            else
            results.sort((a,b) => (a[_sort]<b[_sort])? 1:-1);

            res.send(results);
        });
    });


};

module.exports = authorRoutes;