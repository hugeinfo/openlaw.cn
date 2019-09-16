from flask import jsonify
from flask import request
from flask import Flask


app = Flask(__name__)


@app.after_request
def _after_request(res):
    origin = request.headers.get("origin", "*")
    res.headers["Access-Control-Allow-Origin"] = origin
    res.headers["Access-Control-Allow-Credentials"] = "true"
    res.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return res


@app.route("/okay")
def okay():
    return jsonify(1)


@app.route("/save", methods=["POST"])
def save():
    try:
        data = request.get_json()
        save_html(**data)
        return jsonify(1)
    except:
        return jsonify(0)


def save_html(olid, html):
    path = f"download/{olid}.html"
    print("[+]", path)
    with open(path, mode="w", encoding="utf-8") as f:
        f.write(html)


if __name__ == "__main__":
    app.run("0.0.0.0", port=5050, debug=True)

