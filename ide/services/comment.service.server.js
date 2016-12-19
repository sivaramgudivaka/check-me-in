/**
 * Created by Sivaram on 12/18/16.
 */
module.exports = function(app, model) {

    app.post('/api/comment', createComment);
    app.get('/api/comment/:cmid', findCommentById);

    function createComment(req, res) {
        var data = req.body;
        model.commentModel
            .createComment(data)
            .then(function (comment) {
                    res.send(comment);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findCommentById(req, res) {
        model
            .commentModel
            .findCommentById(req.params.cmid)
            .then(
                function (comment) {
                    if(comment) {
                        res.send(comment);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};/**
 * Created by Sivaram on 12/19/16.
 */
