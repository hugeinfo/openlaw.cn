updata = {
    "poodll@163.com": "huge2019",
    # "gzj44270@bcaoo.com": "gzj44270",
    # "inq48546@bcaoo.com": "inq48546",
    # "aae57837@bcaoo.com": "aae57837",
    # "kan90259@bcaoo.com": "kan90259",
    # "lly92614@tuofs.com": "lly92614",
}


def _gen_upass():
    for u, p in updata.items():
        yield {"username": u, "password": p}
    yield from _gen_upass()


gen_next = _gen_upass()


def next_upass():
    return next(gen_next)
