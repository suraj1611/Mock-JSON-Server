const postRoutes = (app,fs) => {

    const data = "./store.json";

    // GET Request
    app.get('/posts', (req,res)=> {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            let posts = JSON.parse(data);
            res.send(posts.posts);
        });
    });

    // GET using ID
    app.get('/posts/:id', (req,res)=> {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            const id = req.params.id;
            let posts = JSON.parse(data);
            res.send(posts.posts[id]);
        });
    });

    // POST request
    app.post('/posts', (req, res) => {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            let posts = JSON.parse(data);
            let newdata = req.body;
            posts.posts.push(newdata);
            fs.writeFile('./store.json' , JSON.stringify(posts), 'utf-8', function(err) {
                if (err) throw err
            })   
            res.send('New post added');      
        });
    });

    // DELETE request
    app.delete('/posts/:id', (req,res) => {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            const id = req.params.id;
            let posts = JSON.parse(data);
            let newdata = {...posts};
            let filteredPosts = posts.posts.filter((post) => post.id != id);
            newdata.posts = filteredPosts;
            fs.writeFile('./store.json' , JSON.stringify(newdata), 'utf-8', function(err) {
                if (err) 
                throw err
            })
            res.send('Post deleted');
                   
        });
    });

    // PUT request
    app.put('/posts/:id', (req,res) => {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            const id = req.params.id;
            let posts = JSON.parse(data);
            let newdata = req.body;
            posts.posts[id] = newdata;
            fs.writeFile('./store.json' , JSON.stringify(posts), 'utf-8', function(err) {
                if (err) throw err
            })
            res.send('Post Modified');          
        });
    });

    //Filtering at entity level

    app.get('/filterPosts', (req,res) => {

        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
            
        const x  = req.query;
        console.log(x.title);

        let posts = JSON.parse(data);
        let results = posts.posts;

        id = x.id;
        title = x.title;
        author = x.author;
        views = x.views;
        reviews = x.reviews;

        if(id)
        {
            results = results.filter(r => r.id === id);
        }

        if(title)
        {
            results = results.filter(r => r.title === title);
        }

        if(author)
        {
            results = results.filter(r => r.author === author);
        }

        if(views)
        {
            results = results.filter(r => r.views === views);
        }

        if(reviews)
        {
            results = results.filter(r => r.reviews === reviews);
        }

        res.send(results);
            
        });

    });


    //Sorting at entity level :
    app.get('/sortPosts', (req,res)=> {
        fs.readFile(data, 'utf8', (err,data)=> {
            if(err)
            {
                throw err;
            }
                
            const id = req.params.id;
            let posts = JSON.parse(data);

            const x  = req.query;
            console.log(x);
            let results = posts.posts;
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

module.exports = postRoutes;