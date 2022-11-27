const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const getPath = (o, target) => {
    if (!o || typeof o !== 'object') return;
    if (target in o) return [target];
    for (const k in o) {
        const temp = getPath(o[k], target);
        if (temp) return [k, ...temp];
    }
};

let root = {
    type: "dir",
    children: {
        home: {
            type: "dir",
            children: {
                myname: {
                    type: "dir",
                    children1: {
                        "filea.txt": {
                            type: "file",
                        },
                        "fileb.txt": {
                            type: "file",
                        },
                        projects: {
                            type: "dir",
                            children: {
                                mysupersecretproject: {
                                    type: "dir",
                                    children: {
                                        mysupersecretfile: {
                                            type: "file",
                                        },
                                    },
                                }
                            },
                        },
                    }
                },
            },
        }
    },
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/path/:myPath', (req, res) => {
    const myPath = req.params.myPath;
    const result = getPath(root, myPath);
    res.send(result);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
