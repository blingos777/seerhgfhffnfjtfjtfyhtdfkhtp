const fetch = require('node-fetch');
const { WebhookClient } = require('discord.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1453871494147866626/PEEzYV8361dj_LO37st0OsB5INSmU4mXSW9ACy-d5xIUQLMpjLA3Q5xtDrEaa2IPTIxA';
const webhook = new WebhookClient({ url: WEBHOOK_URL });

// القائمة الكاملة محدثة
const animals = [
    // الجدد (85%)
    { name: "Los Candies", money: [334, 391, 253, 230, 196, 138, 92, 35, 23] },
    { name: "La Secret Combinasion", money: [2000, 625, 125] },
    { name: "Esok Sekolah", money: [720, 450, 300, 255, 240, 218, 210, 188, 180, 128, 120, 105, 98, 38, 30] },
    { name: "Mieteteira Bicicleteira", money: [403, 364, 260, 234, 195, 182, 156, 130, 104, 78, 33, 32, 30, 26] },
    { name: "Spaghetti Tualetti", money: [600, 510, 375, 360, 300, 195, 180, 90, 75, 60] },
    { name: "La Spooky Grande", money: [533, 392] }, // $392M/s جديد
    { name: "Los Spaghettis", money: [1100, 525, 420] }, // $1.1B/s جديد
    { name: "Los 67", money: [293, 270, 158, 135, 113, 107, 101, 68, 60, 45, 38, 23] },
    { name: "Los Combinasionas", money: [210, 195, 180, 165, 150, 128, 120, 113, 109, 105, 98, 94, 90, 68, 60, 53, 49, 45, 19, 15] },
    { name: "Naughty Naughty", money: [45, 41, 36, 30, 21, 20, 19, 18] },
    { name: "La Ginger Sekolah", money: [469, 391, 315, 253, 233] },
    { name: "Chicleteira Noelteira", money: [315, 270, 240, 233, 203, 165, 150, 146, 135, 128, 127.5, 105, 98, 90, 15] },
    { name: "Swag Soda", money: [104, 78, 52, 13] },
    { name: "Los Nooo My Hotspotsitos", money: [96, 77, 69, 54, 39, 33, 30, 29, 19, 17] },
    { name: "Graipuss Medussi", money: [10] },
    { name: "Los Mobilis", money: [286, 242, 231, 220, 165, 132, 110, 99, 88, 66, 22] },
    { name: "Santa Hotspot", money: [72, 46, 39, 35, 31, 30, 29, 27, 26, 25, 23, 22, 21, 18, 16, 13] },
    { name: "Los Jolly Combinasionas", money: [130, 20] },
    { name: "Los 25", money: [205, 163, 135, 130, 120, 113, 110, 100, 85, 83, 75, 62.5, 60, 45, 40, 23, 15, 10] }, // $62.5M/s جديد
    { name: "Quesadilla Crocodila", money: [61, 51, 50, 42, 41, 39, 37, 35, 32, 31, 27, 26, 24, 23, 18, 15, 14, 12] },
    { name: "Triplito Tralaleritos", money: [23, 18, 17, 14, 13, 12, 11] },
    { name: "Money Money Puggy", money: [273, 231, 221, 210, 137, 131, 126, 110, 105, 95, 84, 63, 38, 32, 26, 21] },
    { name: "Los Burritos", money: [191, 149, 128, 125, 123, 115, 113, 102, 87, 81, 60] },
    { name: "Tung Tung Tung Sahur", money: [13] },
    { name: "Eviledon", money: [189, 173, 32] },
    { name: "Chimnino", money: [242, 200, 168, 161, 147, 144, 140, 119, 112, 102, 98, 84, 70, 42, 35, 21, 18, 14] },
    { name: "Celularcini Viciosini", money: [303.7, 270] }, // $303.7M/s جديد
    { name: "La Extinct Grande", money: [153] },
    { name: "Reinito Sleighito", money: [140] },
    { name: "Strawberry Elephant", money: [550] },
    { name: "Fragrama and Chocrama", money: [2400, 1800] }, // $2.4B/s جديد
    { name: "Las Sis", money: [227.5] }, // جديد
    { name: "Orcaledon", money: [160] }, // جديد
    { name: "Dragon Gingerini", money: [300] }, // جديد
    { name: "Burguro And Fryuro", money: [1200] }, // $1.2B/s جديد
    { name: "Lavadorito Spinito", money: [405, 146.2, 135] }, // $146.2M/s جديد
    { name: "Mariachi Corazoni", money: [125, 87.5] }, // $87.5M/s جديد
    // الـ gods (2%)
    { name: "Garama and Madundung", money: [1400, 750, 400] },
    { name: "Meowl", money: [450] },
    { name: "Cooki and Milki", money: [2500, 155] }, // $155M/s جديد
    { name: "Los Primos", money: [1100] },
    { name: "Swaggy Bros", money: [1400] },
    { name: "Spooky and Pumpky", money: [1000] },
    { name: "La Secret Combinasion", money: [2000] },
    { name: "Capitano Moby", money: [1900] }, // $1.9B/s جديد
    // باقي (15%)
    { name: "Nuclearo Dinossauro", money: [165, 150, 133, 120, 94, 79, 64, 60, 46, 30, 23, 19, 15] },
    { name: "Gobblino Uniciclino", money: [165, 28] },
    { name: "Burrito Bandito", money: [68, 64, 60, 58, 56, 54, 51, 45, 42, 38, 36, 34, 32, 30, 28, 26, 24, 12] },
    { name: "Chillin Chili", money: [325] },
    { name: "Dragon Cannelloni", money: [313, 250] },
    { name: "Ketupat Kepat", money: [525, 315, 280, 219, 210, 184, 140, 53, 47, 44, 35] },
    { name: "Los Cucarachas", money: [22, 21, 19, 16, 15, 14, 13, 11, 10] },
    { name: "Money Money Reindeer", money: [150, 25] },
    { name: "Tang Tang Keletang", money: [243, 209, 134, 109, 42, 34] },
    { name: "Los Puggies", money: [270, 241, 188, 180, 420] },
    { name: "Quesadillo Vampiro", money: [46, 32, 18] },
    { name: "Los Spooky Combinasionas", money: [210, 200, 170, 150, 110, 105, 100, 25] },
    { name: "Tictac Sahur", money: [47, 38] },
    { name: "Telemorte", money: [21, 16] },
    { name: "Horegini Boom", money: [17, 12] },
    { name: "Noo my Present", money: [72, 39, 38, 36] },
    { name: "Los Jobcitos", money: [26, 13, 12] },
    { name: "Chicleteira Bicicleteira", money: [45, 32, 30, 25, 22, 21, 17, 11] },
    { name: "Chicleteirina Bicicleteirina", money: [40, 25, 17, 16] },
    { name: "La Taco Combinasion", money: [44] },
    { name: "Rang Ring Bus", money: [60] },
    { name: "La Cucaracha", money: [14] }
];

// خريطة الصور محدثة
const images = {
    "Spaghetti Tualetti": "https://images-ext-1.discordapp.net/external/EcpQoU4S5IfOdp9Yn-JRMYl7anJWiHbpvV1-wQc-_Nw/https/static.wikia.nocookie.net/stealabr/images/b/b8/Spaghettitualetti.png?format=webp&quality=lossless&width=515&height=443",
    "La Ginger Sekolah": "https://media.discordapp.net/attachments/1426979768649388093/1452514349058101289/latest.png?ex=695005a7&is=694eb427&hm=c64f0ed678758949e384bb10a9700cc57698756d7f9fab17a01a0ec51cd72f3c&=&format=webp&quality=lossless&width=431&height=581",
    "Money Money Puggy": "https://images-ext-1.discordapp.net/external/ax7-d3xgZ_0sTF4dctsYRiMlrMv1ZcbvjEF1g9oyi8s/https/static.wikia.nocookie.net/stealabr/images/0/09/Money_money_puggy.png?format=webp&quality=lossless&width=663&height=663",
    "Swaggy Bros": "https://media.discordapp.net/attachments/1449486788128280838/1452519895639265291/1000.png?ex=69500ad1&is=694eb951&hm=5fc96ad8487839a8516993f5ed4362c0fc00fdae6cfeb73d1ba96808a4fbcdee&=&format=webp&quality=lossless&width=647&height=581",
    "Nuclearo Dinossauro": "https://media.discordapp.net/attachments/1449486788128280838/1452521421501759689/latest.png?ex=69500c3d&is=694ebabd&hm=4b84abb424cff8ae624d4784ff722365d7f479d76f74dea3a24c1cae62287d6d&=&format=webp&quality=lossless&width=584&height=385",
    "Los Puggies": "https://images-ext-1.discordapp.net/external/j_0wsAqLq7_CbwxnvNjy9a9WehIqfndX_QNvB6ZKvbY/https/static.wikia.nocookie.net/stealabr/images/c/c8/LosPuggies2.png?format=webp&quality=lossless&width=400&height=221",
    "Ketchuru and Musturu": "https://images-ext-1.discordapp.net/external/XHLqayNJgkcfc9GT9UWQTYagl1rzCQfVoD2X7wQzpsk/https/static.wikia.nocookie.net/stealabr/images/1/14/Ketchuru.png?format=webp&quality=lossless&width=384&height=389",
    "La Secret Combinasion": "https://images-ext-1.discordapp.net/external/y3saBAMC-CIBBvvXKfiK4ryRNDoAlXPhksQ7TEWHvJQ/https/static.wikia.nocookie.net/stealabr/images/f/f2/Lasecretcombinasion.png?format=webp&quality=lossless&width=287&height=380",
    "Ketupat Kepat": "https://images-ext-1.discordapp.net/external/5OkE7b5lV810PFVtyb3mAnoM1TcKzEwleZRBcbTbyTs/https/static.wikia.nocookie.net/stealabr/images/a/ac/KetupatKepat.png?format=webp&quality=lossless&width=350&height=329",
    "Capitano Moby": "https://images-ext-1.discordapp.net/external/2I6DV_gx6ZgCyndi1r1WN6BuXZmV6DtibLcz5F0usH4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Moby.png?format=webp&quality=lossless&width=425&height=403",
    "Tang Tang Keletang": "https://images-ext-1.discordapp.net/external/zh1JnR754cZz4jSroK1XdT3ZnxSY9V_RC0RP44nAakM/https/static.wikia.nocookie.net/stealabr/images/c/ce/TangTangVfx.png?format=webp&quality=lossless&width=53&height=53",
    "Fragrama and Chocrama": "https://images-ext-1.discordapp.net/external/bB9o2FpwBFjMybD5edtAzOjHRAZF8LS3Nl3q3TIkW5Y/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Fragrama.png?format=webp&quality=lossless&width=361&height=315",
    "Burguro And Fryuro": "https://images-ext-1.discordapp.net/external/jsvneFUiTH2VoZAZA3DfH9bsdn_XCNHp4UV6JNoYhY4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Burguro-And-Fryuro.png?format=webp&quality=lossless&width=46&height=53",
    "Tictac Sahur": "https://images-ext-1.discordapp.net/external/bS0KoEdqG6X_0qSIbFq_u1hwOyifrPIXOB8llt89Qrw/https/static.wikia.nocookie.net/stealabr/images/6/6f/Time_moving_slow.png?format=webp&quality=lossless&width=266&height=272",
    "Los Mobilis": "https://images-ext-1.discordapp.net/external/an7Mz8RuoPNXhGXfAb5ha30cq1dpFtAuY0kt_vzhcNs/https/static.wikia.nocookie.net/stealabr/images/2/27/Losmobil.png?format=webp&quality=lossless&width=300&height=399",
    "Lavadorito Spinito": "https://images-ext-1.discordapp.net/external/xWDGbsqd2vgfkI5txdKJ0_1WI8AxulLec-BcQnodpno/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Lavadorito_Spinito.png?format=webp&quality=lossless&width=195&height=288",
    "67": "https://images-ext-1.discordapp.net/external/e2m2ubFvsOJFQo3HJjSy9vvj6yGyNPosO9qm2VE4QiU/https/static.wikia.nocookie.net/stealabr/images/8/83/BOIIIIIII_SIX_SEVEN_%25F0%259F%2598%2582%25F0%259F%2598%2582%25F0%259F%2598%2582%25F0%259F%2598%2582%25F0%259F%2598%2582%25F0%259F%2598%2582%25F0%259F%2598%2582%25F0%259F%2598%2582%25F0%259F%2598%2582%25F0%259F%2598%2582.png?format=webp&quality=lossless&width=467&height=373",
    "Festive 67": "https://media.discordapp.net/attachments/1449486788128280838/1452519495049678899/latest.png?ex=69500a72&is=694eb8f2&hm=e48750ec9807942a27c84c265cff4b216a75290c219d3f830d66a7b109f883a4&=&format=webp&quality=lossless&width=382&height=290",
    "Garama and Madundung": "https://images-ext-1.discordapp.net/external/yL655tEsAB2hOmgy_UiPBnIXJ0gMhj8LZ14_AABBSWI/https/static.wikia.nocookie.net/stealabr/images/e/ee/Garamadundung.png?format=webp&quality=lossless&width=474&height=426",
    "La Casa Boo": "https://images-ext-1.discordapp.net/external/ysiG0rh1UkmBPpBGDPQP4_BN1OeVcsbRAG61U_29yz8/https/static.wikia.nocookie.net/stealabr/images/d/de/Casa_Booo.png?format=webp&quality=lossless&width=313&height=354",
    "Reinito Sleighito": "https://media.discordapp.net/attachments/1449486788128280838/1452519184369057938/1000.png?ex=69500a28&is=694eb8a8&hm=0d48539fb996c283788ab4a2ea64f49e4d0bca5440026731a18b1511d31619f9&=&format=webp&quality=lossless&width=582&height=582",
    "La Grande Combinasion": "https://images-ext-1.discordapp.net/external/HA6Dow-tVxcxKTy7l710nfzj4ZKI9I6VVsQZj_yft40/https/static.wikia.nocookie.net/stealabr/images/d/d8/Carti.png?format=webp&quality=lossless&width=289&height=384",
    "Celularcini Viciosini": "https://images-ext-1.discordapp.net/external/49Ht7wzcOh-MvsodEReoRtorreMi25w6oKROg9XxUJ8/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/DO_NOT_GRAB_MY_PHONE%21%21%21.png?format=webp&quality=lossless&width=121&height=183",
    "Los 67": "https://media.discordapp.net/attachments/1434317271949639842/1434836206155468800/Los-67.png?ex=694fa659&is=694e54d9&hm=473d11c967d94200dea6360f215a7ac67940241142807665fb6b2cc741397115&=&format=webp&quality=lossless&width=445&height=273",
    "Chicleteira Bicicleteira": "https://images-ext-1.discordapp.net/external/r2iBQuxuWBo8KQQRgrFc-0ihtnmlB5QEnRLcJR5NGHk/https/static.wikia.nocookie.net/stealabr/images/5/5a/Chicleteira.png?format=webp&quality=lossless&width=328&height=417",
    "Dragon Cannelloni": "https://images-ext-1.discordapp.net/external/dkBp4QtMt9HNWkJSWfyxNH_UbpDfds6Fkly7gwnXc4Q/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Dragoncanneloni.png?format=webp&quality=lossless&width=595&height=431",
    "Meowl": "https://images-ext-1.discordapp.net/external/qGARhd06-uG_SNvrnx6LMwjr7N9iIYkdcxR8B79WilA/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Clear_background_clear_meowl_image.png?format=webp&quality=lossless&width=256&height=371",
    "Spooky and Pumpky": "https://images-ext-1.discordapp.net/external/WCkCJd4qNWtK345X3UksUSwIRXai9iC-voqwD4xHZ3I/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Spookypumpky.png?format=webp&quality=lossless&width=309&height=235",
    "La Taco Combinasion": "https://images-ext-1.discordapp.net/external/vkJzy95e93V5EXTFEDdo-0u6ePYGYqFXLU474yGpt9w/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Taco_TUESDAYYYYYYYY.png?format=webp&quality=lossless&width=280&height=281",
    "Los Primos": "https://images-ext-1.discordapp.net/external/SrOZFzS2DWjsWKGFC9swApHVmwXKySdMwOEcuSZh8Bo/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/LosPrimos.png?format=webp&quality=lossless&width=513&height=365",
    "Chimnino": "https://images-ext-1.discordapp.net/external/zxRKW555TrJTmny2PNdeWkTdX-34dzWXqfzrvkK8GCg/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Chimnino.png?format=webp&quality=lossless&width=199&height=336",
    "Los Candies": "https://images-ext-1.discordapp.net/external/ODH4v1-QPzCBqXNDvByB9UORpS2QNyzIYNOkGiibyJw/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Candy%21.png?format=webp&quality=lossless&width=366&height=227",
    "Los Chicleteiras": "https://images-ext-1.discordapp.net/external/cFKTJSa8ZC-jgD57BHixYoOTtqYTR_YSTajj2rQFxkI/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Los_ditos.png?format=webp&quality=lossless&width=445&height=385",
    "Eviledon": "https://images-ext-1.discordapp.net/external/rpXa6lT3KzYVp0ZH5nqdqjKPGb9v9uSnRXUlonwyFjM/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Eviledonn.png?format=webp&quality=lossless&width=309&height=235",
    "W or L": "https://images-ext-1.discordapp.net/external/WABAjMptdtKu0Zy531JyWV8reSXzCxxzxpTnqReOaUM/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Win_Or_Lose.png?format=webp&quality=lossless&width=347&height=284",
    "Chicleteira Noelteira": "https://images-ext-1.discordapp.net/external/gjOFOTSISXHxyIGjyqsPjUV2FFRycIgfLnrhUsRjanM/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Noel.png?format=webp&quality=lossless&width=309&height=359",
    "Santa Hotspot": "https://images-ext-1.discordapp.net/external/1POsXZp5Ec1fJo4j4MTnNIZ3I81SEtZ9aakxp9QUKRg/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Santa_Hotspot.png?format=webp&quality=lossless&width=171&height=282",
    "Los Quesadillas": "https://images-ext-1.discordapp.net/external/cXGWGjBmQ6aYhFPjYjucqJKLWV8tspR59z7lYrWUU3o/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/LosQuesadillas.png?format=webp&quality=lossless&width=459&height=219",
    "Chicleteirina Bicicleteirina": "https://images-ext-1.discordapp.net/external/dseThDR2aAe79G2CNLV1qMLSOYcapQu0lRR4G22Bgm4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Chicleteirina_Bicicleteirina.png?format=webp&quality=lossless&width=257&height=387",
    "Lavadorito Spinito": "https://images-ext-1.discordapp.net/external/xWDGbsqd2vgfkI5txdKJ0_1WI8AxulLec-BcQnodpno/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Lavadorito_Spinito.png?format=webp&quality=lossless&width=195&height=288",
    "Mariachi Corazoni": "https://images-ext-1.discordapp.net/external/TUs_WfiYfel-_4DpRc0jx99omupdfIfegsY0Vmlnh7E/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/MariachiCora.png?format=webp&quality=lossless&width=213&height=323",
    "Los 25": "https://images-ext-1.discordapp.net/external/sOqMoNVTjY0GFdQ1zvkZbG0INMe31afoRPGGz5zyhco/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Transparent_Los_25.png?format=webp&quality=lossless&width=312&height=192",
    "Celularcini Viciosini": "https://images-ext-1.discordapp.net/external/49Ht7wzcOh-MvsodEReoRtorreMi25w6oKROg9XxUJ8/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/DO_NOT_GRAB_MY_PHONE%21%21%21.png?format=webp&quality=lossless&width=121&height=183",
    "La Spooky Grande": "https://images-ext-1.discordapp.net/external/qLIQ6_AgS5iKGs7FdqHj6yI-a5b5mOBAEpHkIygllKY/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Spooky_Grande.png?format=webp&quality=lossless&width=300&height=399",
    "Las Sis": "https://images-ext-1.discordapp.net/external/5r1IuuVG9vvy2VQOktc_vtxFATC7-ZF6cULJStJ-oA4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Las_Sis.png?format=webp&quality=lossless&width=346&height=384",
    "Orcaledon": "https://images-ext-1.discordapp.net/external/ZKPjPvdO2j67H78cgwoChVoXYZ-LuAKQS8ajP014TAI/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Orcaledon.png?format=webp&quality=lossless&width=482&height=360",
    "Cooki and Milki": "https://images-ext-1.discordapp.net/external/YdY9ttiYHXOgIEHgzdVE-nJE0cB9appgOWZw_k4czmk/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Cooki_and_milki.png?format=webp&quality=lossless&width=392&height=281",
    "Los Spaghettis": "https://images-ext-1.discordapp.net/external/eg0sVn3mRGkY_CwTBbxw_TPjKVBxFnqlioyKPetvBTc/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/LosSpaghettis.png?format=webp&quality=lossless&width=412&height=285",
    "Burguro And Fryuro": "https://images-ext-1.discordapp.net/external/jsvneFUiTH2VoZAZA3DfH9bsdn_XCNHp4UV6JNoYhY4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Burguro-And-Fryuro.png?format=webp&quality=lossless&width=46&height=53",
    "Dragon Gingerini": "https://images-ext-1.discordapp.net/external/TNu9-fYxVWhYeuGAeGxzThV2A7zqPSO-Da8sZoI9q68/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Gingerbread_Dragon_Leak.png?format=webp&quality=lossless&width=217&height=237",
    "Fragrama and Chocrama": "https://images-ext-1.discordapp.net/external/bB9o2FpwBFjMybD5edtAzOjHRAZF8LS3Nl3q3TIkW5Y/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Fragrama.png?format=webp&quality=lossless&width=361&height=315",
    "Capitano Moby": "https://images-ext-1.discordapp.net/external/2I6DV_gx6ZgCyndi1r1WN6BuXZmV6DtibLcz5F0usH4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Moby.png?format=webp&quality=lossless&width=425&height=403"
};

const normal_new_animals = animals.slice(0, 35);
const god_animals = animals.slice(35, 42);
const old_animals = animals.slice(42);

const purple_color = 0x9B59B6; // بنفسجي ثابت

const emojis = [
    <:1403471635515703487:1454219094470692996>
];

let last_animal_name = null;

function generate_others(main_money_value) {
    const num = [0, 1, 4, 5][Math.floor(Math.random() * 4)];
    const others = [];
    for (let i = 0; i < num; i++) {
        let animal, money_val;
        const r = Math.random();
        if (r < 0.05) {
            animal = god_animals[Math.floor(Math.random() * god_animals.length)];
        } else if (r < 0.65) {
            const low_animals = animals.filter(a => a.money.some(m => m < 100));
            animal = low_animals[Math.floor(Math.random() * low_animals.length)];
        } else {
            animal = animals[Math.floor(Math.random() * animals.length)];
        }
        const possible = animal.money.filter(m => m < main_money_value);
        money_val = possible.length > 0 ? possible[Math.floor(Math.random() * possible.length)] : Math.floor(main_money_value / 2) || 10;
        others.push(`${animal.name}: $${money_val}M/s`);
    }
    return others.join('\n') || '';
}

async function send_animal_notifier() {
    let animal;
    const r = Math.random();
    if (r < 0.02 && god_animals.length > 0) {
        animal = god_animals[Math.floor(Math.random() * god_animals.length)];
    } else if (r < 0.85) {
        animal = normal_new_animals[Math.floor(Math.random() * normal_new_animals.length)];
    } else {
        animal = old_animals.length > 0 ? old_animals[Math.floor(Math.random() * old_animals.length)] : animals[Math.floor(Math.random() * animals.length)];
    }

    while (animal.name === last_animal_name && animals.length > 1) {
        animal = animals[Math.floor(Math.random() * animals.length)];
    }
    last_animal_name = animal.name;

    const main_money_val = animal.money[Math.floor(Math.random() * animal.money.length)];
    const money = main_money_val >= 1000 ? `$${ (main_money_val / 1000).toFixed(1) }B/s` : `$${main_money_val}M/s`;
    const players = `${Math.floor(Math.random() * 5) + 4}/8`;
    const others = generate_others(main_money_val);
    const random_emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const embed = {
        title: ` Akundisco Notifier | Priority ${random_emoji} `,
        color: purple_color,
        fields: [
            { name: "Name", value: animal.name, inline: false },
            { name: "Money/sec", value: money, inline: true },
            { name: "Players", value: players, inline: true }
        ],
        footer: { text: `• Akundisco Notifier • Today at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' AM', 'AM').replace(' PM', 'PM')}` }
    };

    if (others) {
        embed.fields.push({ name: "Others", value: `\`\`\`${others}\`\`\``, inline: false });
    }

    // الصورة كـ thumbnail داخل الـ embed على اليمين
    if (images[animal.name]) {
        embed.thumbnail = { url: images[animal.name] };
    }

    try {
        await webhook.send({ embeds: [embed] });
        console.log(`تم إرسال: ${animal.name} - ${money} (${players})`);
    } catch (e) {
        console.log("خطأ في الإرسال:", e);
    }
}

// سيرفر لـ UptimeRobot
app.get('/', (req, res) => {
    res.send('Bot is alive! Keep it running 24/24 🔥');
});

app.listen(PORT, () => {
    console.log(`سيرفر شغال على الـ port ${PORT}`);
});

// إرسال كل دقيقة
setInterval(send_animal_notifier, 60000);

// أرسل واحد فورًا
send_animal_notifier();
