# import urllib.request as request
from threading import Thread
from urllib import request
from bs4 import BeautifulSoup
import requests
import json
import os
import asyncio
import curio


TEMPLATE_FOLDER: str = "templates/"
OUTPUT_FOLDER: str = "static/output/"
DOMAIN = "https://www.serebii.net"
POKEMON_DATA_URL = "/pokemon/nationalpokedex.shtml"
IMAGE_OUTPUT_FOLDER = "images-out"


def get_html_soup_from_url(url: str) -> BeautifulSoup:
    return BeautifulSoup(requests.get(url).text, 'html.parser')


async def get_pokemon_rows(html: BeautifulSoup):
    keys = [header.get_text(strip=True) for header in html.find_all("td", class_="fooevo") if "Base Stats" not in header.get_text(strip=True)]

    rows: list[dict] = []
    print("|".join(key.center(50) if key in ["Name", "Abilities"] else key.center(5) for key in keys if key not in ["Pic", "No.", "Type"]))

    for row in html.findAll("tr"):
        column_keys = iter(keys.copy())
        columns = {
            next(column_keys):
            column.get_text(strip=True)
            or [img.get("src") for img in column.find_all("img")]
            for column in row.find_all("td", class_="fooinfo")
        }
        if len(columns) > 0:
            rows.append(columns)

    for row in rows:
        row["Id"] = int(row.pop("No.").replace("#", ""))
        row["Types"] = [type.removeprefix("/pokedex-bw/type/").removesuffix(".gif") for type in row.pop("Type")]
        row.pop("Pic")
        print(
            "|".join(
                str(item).center(50) if key in ["Name", "Abilities"]
                else str(item).center(5)
                for key, item in row.items() if key not in ["Types"]
            )
        )

    dump = ",\n".join(json.dumps(row) for row in rows)
    with open("output.json", "w") as out:
        out.write(dump)

    return threaded_fetch_all_images([row["Id"] for row in rows], 200)


async def fetch_all_images(id_list: list[int]):
    tasks = []
    responses = []
    for id in id_list:
        task = await curio.spawn(get_images(id))
        tasks.append(task)

    for task in tasks:
        content = await task.join()
        responses.append(content)
        print(content)


def threaded_fetch_all_images(id_list: list[int], urls_per_thread: int):
    MyThreadsList = []
    MyThreadsResults = []
    N_Threads = (lambda x: int(x/urls_per_thread) if (x % urls_per_thread == 0) else int(x/urls_per_thread)+1)(len(id_list))
    for i in range(N_Threads):
        MyThreadsList.append(Thread(
            target=curio.run,
            args=[fetch_all_images(id_list[i*urls_per_thread:(urls_per_thread*i+urls_per_thread)])]
        ))
        MyThreadsList[i].start()
    for i in range(N_Threads):
        MyThreadsResults.append(MyThreadsList[i].join())
    return MyThreadsResults


async def get_images(id):
    if not os.path.exists(IMAGE_OUTPUT_FOLDER):
        os.makedirs(IMAGE_OUTPUT_FOLDER, exist_ok=True)
        os.makedirs(IMAGE_OUTPUT_FOLDER + "/icon")
        os.makedirs(IMAGE_OUTPUT_FOLDER + "/art")

    file = str(id).zfill(3)

    request.urlretrieve(
        f"{DOMAIN}/pokedex-sv/icon/new/{file}.png",
        f"{IMAGE_OUTPUT_FOLDER}/icon/{str(id)}.png"
    )
    request.urlretrieve(
        f"{DOMAIN}/pokemon/art/{file}.png",
        f"{IMAGE_OUTPUT_FOLDER}/art/{str(id)}.png"
    )

    print(f"Images for {id} saved!")


def main():
    asyncio.run(get_pokemon_rows(get_html_soup_from_url(DOMAIN + POKEMON_DATA_URL)))


if __name__ == '__main__':
    main()
