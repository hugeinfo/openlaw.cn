def split_data(nodes):
    from re import match

    data = {}
    for node in nodes:
        if not node:
            continue
        for li in node.find_all("li"):
            kv = li.get_text().strip()
            m = match(r"(.+) *[:：] *(.+)", kv)
            if m:
                k, v = m.group(1, 2)
                data[k] = v
    return data


def parse_html(html):
    from bs4 import BeautifulSoup

    data = {}
    soup = BeautifulSoup(html, "html5lib")
    title = soup.find("h2", class_="entry-title")
    data["title"] = title.get_text()
    cont = soup.find(id="entry-cont")
    data["content"] = {}
    for part in cont.find_all(class_="part"):
        partid = part.get("id").lower()
        ps = [p.get_text() for p in part.find_all("p")]
        data["content"][partid] = ps
    data["metadata"] = split_data(
        soup.find(class_=cl) for cl in ["entry-header", "HT_KB_Authors_Widget"]
    )
    return data


if __name__ == "__main__":
    from os import listdir
    from json import dumps

    for htmlfile in listdir("download"):
        if not htmlfile.endswith(".html"):
            continue
        with open(f"download/{htmlfile}", encoding="utf-8") as f:
            data = parse_html(f.read())
            print(dumps(data, ensure_ascii=False, indent=2))
        input()

