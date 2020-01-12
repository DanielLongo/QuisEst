from flask import Flask, request
from author_id import classify_text, AUTHORS
app = Flask(__name__)


# @app.route("/")
# def index():
#     return "Salve Amice"


@app.route("/")
def receive():
    print("Received")
    text = request.args.get("text")
    scores = classify_text(text)
    assert(len(scores) == len(AUTHORS)), "Number of Scores should equal number of Authors"
    out = {}
    for i in range(len(AUTHORS)):
        # TODO: Make sure authors and scores line up
        out[AUTHORS[i]] = scores[i]

    print("text:", text)
    print("out:", out)

    return out


if __name__ == "__main__":
    app.run()
