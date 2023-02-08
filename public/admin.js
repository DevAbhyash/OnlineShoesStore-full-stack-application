const asin = [
    "B07DJJQDHR",
    "B01HFPP1ME",
    "B01HFPP1ME",
    "B01HFPP1ME",
    "B07DJJQDHR",
    "B01HFPP1ME",
    "B07DJJQDHR",
    "B01HFPP1ME",
];
const apiKey = "BC23549624794A4A8B3BAEC7AA0B0184";
let count = 1;

async function gettingApis(item) {
    let data = await fetch(
        `https://api.rainforestapi.com/request?api_key=BC23549624794A4A8B3BAEC7AA0B0184&type=product&amazon_domain=amazon.com&asin=${item}`
    );
    let response = await data.json();
    console.log(response);
    let qty = document.querySelector(`.quantity${count}`);
    let rating = document.querySelector(`.rating${count}`);
    let shoesRating = response.product.rating;
    let quantity = response.product.images_count;
    qty.innerHTML = quantity;
    rating.innerHTML = shoesRating;
    console.log(shoesRating);
    count += 1;
}

asin.forEach((item) => {
    gettingApis(item);
});