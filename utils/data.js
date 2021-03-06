import bcrypt from "bcryptjs";
export const data = {
  user: [
    {
      name: "kaif ali",
      email: "kaif@gmail.com",
      phonenumber: "123456789",
      profileImg: null,
      password: bcrypt.hashSync("imkaifali"),
      isAdmin: true,
      job: "Eng",
    },
    {
      name: "jhonwick",
      email: "jhonwick@gmail.com",
      phonenumber: "1234567899",
      profileImg:
        "https://m.media-amazon.com/images/I/714s29JGWIL._AC_UY500_.jpg",
      password: bcrypt.hashSync("imjhonwick"),
      isAdmin: false,
      job: "Eng",
    },
  ],
  newProducts: [
    {
      images: [
        {
          public_id: "nextjs_media/pb8fnxyickqqe9krov82",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605263280/nextjs_media/pb8fnxyickqqe9krov82.jpg",
        },
        {
          public_id: "nextjs_media/irfwxjz56x4xa6pdwoks",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605263281/nextjs_media/irfwxjz56x4xa6pdwoks.jpg",
        },
      ],
      checked: false,
      inStock: 500,
      sold: 0,
      name: "animal",
      price: 5,
      slug: "animal_animal",
      brand: "animalis",
      description:
        "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      content:
        "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      category: "5faa35a88fdff228384d51d8",
      rating: 3.2,
      numReviews: 10,
    },
    {
      images: [
        {
          public_id: "nextjs_media/jdi9qo0oiinwik8uxzxn",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605278590/nextjs_media/jdi9qo0oiinwik8uxzxn.jpg",
        },
        {
          public_id: "nextjs_media/k2pjwtpzolcieioacnu2",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605278591/nextjs_media/k2pjwtpzolcieioacnu2.jpg",
        },
        {
          public_id: "nextjs_media/qbh6auephsy5leaapsu1",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605278592/nextjs_media/qbh6auephsy5leaapsu1.jpg",
        },
        {
          public_id: "nextjs_media/gnsgrxorl5utlnxygjn6",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605278594/nextjs_media/gnsgrxorl5utlnxygjn6.jpg",
        },
        {
          public_id: "nextjs_media/w8qj2rlrhh1es8wxhcui",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605278596/nextjs_media/w8qj2rlrhh1es8wxhcui.jpg",
        },
      ],
      checked: false,
      inStock: 300,
      sold: 10,
      name: "wedding invitation",
      slug: "wedding_invitation",
      brand: "weddingis",
      price: 5,
      description:
        "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      content:
        "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      category: "5faa35b58fdff228384d51da",
      rating: 2.2,
      numReviews: 20,
    },
    {
      images: [
        {
          public_id: "nextjs_media/u8qltexka25minj2rj46",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605318879/nextjs_media/u8qltexka25minj2rj46.jpg",
        },
        {
          public_id: "nextjs_media/wb5osprab71emsxp3ibm",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605318910/nextjs_media/wb5osprab71emsxp3ibm.jpg",
        },
        {
          public_id: "nextjs_media/nelvbtwdbk1vjvhufort",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605318911/nextjs_media/nelvbtwdbk1vjvhufort.jpg",
        },
        {
          public_id: "nextjs_media/bnyeto9vaz40yfts92we",
          url: "https://res.cloudinary.com/devatchannel/image/upload/v1605318913/nextjs_media/bnyeto9vaz40yfts92we.jpg",
        },
      ],
      checked: false,
      inStock: 153,
      sold: 5,
      name: "laptop",
      slug: "laptop_laptop",
      brand: "laptopis",
      price: 25,
      description:
        "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      content:
        "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      category: "5faa35a88fdff228384d51d8",
      rating: 4.9,
      numReviews: 200,
    },
  ],
  products: [
    {
      name: "Black TShirt Men/Woman",
      slug: "black-tshirt-men-woman",
      image: "https://m.media-amazon.com/images/I/714s29JGWIL._AC_UY500_.jpg",
      price: 12,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "Tshit for men and women",
    },
    {
      name: "Gildan Men's Heavy Cotton T-Shirt, Style G5000, Multipack",
      slug: "Gildan-Cotton-T-Shirt-2-Pack",
      image: "https://m.media-amazon.com/images/I/71kM3J7wfHL._AC_UX522_.jpg",
      price: 85,
      brand: "Gildan Store",
      rating: 4.1,
      numReviews: 200,
      countInStock: 210,
      description:
        "Solids: 100% Cotton; Sport Grey & antique Heather: 90% Cotton, 10% Polyester; Safety Colors & Heather: 50% Cotton, 50% Polyester",
    },
    {
      name: "Hanes Women's Short Sleeve V-Neck Graphic T-Shirt",
      slug: "Hanes-Graphic-multiple-graphics-available",
      image: "https://m.media-amazon.com/images/I/811n9roXHTL._AC_UY500_.jpg",
      price: 45,
      brand: "Hanes Store",
      rating: 4,
      numReviews: 100,
      countInStock: 12,
      description: "60% Polyester, 30% Cotton, 10% Rayon",
    },
    {
      name: "Black TShirt Men/Woman",
      slug: "black-tshirt-men-woman2",
      image: "https://m.media-amazon.com/images/I/714s29JGWIL._AC_UY500_.jpg",
      price: 12,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "Tshit for men and women",
    },
    {
      name: "Gildan Men's Heavy Cotton T-Shirt, Style G5000, Multipack",
      slug: "Gildan-Cotton-T-Shirt-2-Pack2",
      image: "https://m.media-amazon.com/images/I/71kM3J7wfHL._AC_UX522_.jpg",
      price: 85,
      brand: "Gildan Store",
      rating: 4.1,
      numReviews: 200,
      countInStock: 210,
      description:
        "Solids: 100% Cotton; Sport Grey & antique Heather: 90% Cotton, 10% Polyester; Safety Colors & Heather: 50% Cotton, 50% Polyester",
    },
    {
      name: "Hanes Women's Short Sleeve V-Neck Graphic T-Shirt",
      slug: "Hanes-Graphic-multiple-graphics-available2",
      image: "https://m.media-amazon.com/images/I/811n9roXHTL._AC_UY500_.jpg",
      price: 45,
      brand: "Hanes Store",
      rating: 4,
      numReviews: 100,
      countInStock: 12,
      description: "60% Polyester, 30% Cotton, 10% Rayon",
    },
  ],
};
