from flask import jsonify
from flask import request
from flask import Flask

# https://10minutemail.net/
app = Flask(__name__)


@app.after_request
def _after_request(res):
    origin = request.headers.get("origin", "*")
    res.headers["Access-Control-Allow-Origin"] = origin
    res.headers["Access-Control-Allow-Credentials"] = "true"
    res.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return res


# curl localhost:5050/next
@app.route("/next")
def okay():
    from .indices import next_index

    return jsonify(next_index())


@app.route("/upass")
def upass():
    from .upass import next_upass

    return jsonify(next_upass())


@app.route("/save", methods=["POST"])
def save():
    try:
        data = request.get_json()
        save_html(**data)
        return jsonify(1)
    except:
        return jsonify(0)


def save_html(olid, html):
    from .parser import parse_html
    from json import dump

    path = f"download/{olid}.json"
    print("[+]", path)
    data = parse_html(html)
    with open(path, mode="w", encoding="utf-8") as f:
        dump(data, f, indent=2, ensure_ascii=False)


@app.route("/index/<name>", methods=["POST"])
def index(name):
    from json import dump

    if False:
        data = request.get_json()
        with open(f"{name}.json", mode="w", encoding="utf-8") as f:
            dump(data, f, ensure_ascii=False, indent=2)
    return jsonify(1)


if __name__ == "__main__":
    # python3 extserver
    app.run("0.0.0.0", port=5050, debug=True)
