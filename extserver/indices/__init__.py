from json import load

with open("extserver/indices/causeId.json", encoding="utf-8") as f:
    causeTree = load(f)["民事"]  # 719 + 558

with open("extserver/indices/courtId.json", encoding="utf-8") as f:
    courtTree = {k: v for k, v in load(f)["广东省"].items() if k.startswith("广")}

docTypeTree = {"判决书": "http://openlaw.cn/search/judgement/type?docType=Verdict"}


def flattree(tree, head=[]):
    for k, v in tree.items():
        if isinstance(v, dict):
            yield from flattree(v, head + [k])
        elif "openlaw.cn" in v and "?" in v:
            yield head + [k], v.split("?")[1]


def shuffle(iterable):
    import random

    ls = list(iterable)
    random.shuffle(ls)
    return ls


def _gen_index():
    index = 0
    for court, courId in shuffle(flattree(courtTree)):
        for cause, causeId in shuffle(flattree(causeTree)):
            for docType, docTypeId in shuffle(flattree(docTypeTree)):
                print(index, ", ".join(":".join(l) for l in [court, cause, docType]))
                index += 1
                yield "&".join([courId, causeId, docTypeId])
    yield from _gen_index()


gen_next = _gen_index()


def next_index():
    return f"http://openlaw.cn/search/judgement/type?{next(gen_next)}&_auto"
