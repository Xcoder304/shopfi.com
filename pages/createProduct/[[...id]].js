import { useEffect, useState } from "react";
import Head from "next/head";

import {
  Button,
  TextInput,
  NativeSelect,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  fetchTheProductByID,
  GetAllCategories,
  UpdateProduct,
} from "../../utils/DatabaseFuntions";
import { Toaster, toast } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { UploadImage } from "../../utils/UtilsFuntions";
import { AddProduct } from "../../utils/DatabaseFuntions";
import { ArrowLeft } from "tabler-icons-react";
import { useRouter } from "next/router";

const CreateProduct = ({ allCategoriesData, product }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      slug: "",
      price: "",
      brand: "",
      inStock: "",
      category: "",
      description: "",
    },
  });

  useEffect(() => {
    if (product) {
      setImages(product?.images);

      form.setValues({
        name: product?.name,
        slug: product?.slug,
        price: product?.price,
        brand: product?.brand,
        inStock: product?.inStock,
        category: product?.category,
        description: product?.description,
      });
    }
  }, [product]);

  const handleUploadImage = (e) => {
    const newImages = [];
    const numOfImg = 0;

    const files = [...e.target.files];

    files.forEach((file) => {
      numOfImg += 1;
      if (numOfImg <= 7) newImages.push(file);
      return newImages;
    });

    const imgCount = images.length;
    if (imgCount + newImages.length > 7) {
      toast.error("Your Can Only Selecte up to 7 Images");
    } else {
      setImages([...images, ...newImages]);
    }
  };

  const Delete_The_Image = (index) => {
    const newArrOfImg = [...images];
    newArrOfImg.splice(index, 1);
    setImages(newArrOfImg);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    if (images.length == 0) {
      toast.error("Please Enter atleast One Image");
    } else {
      const media = [];
      const imgNewURL = images.filter((img) => !img.imgURL);
      const imgOldURL = images.filter((img) => img.imgURL);

      if (imgNewURL.length > 0) {
        media = await UploadImage(imgNewURL);
      }

      let data = {
        id: product?._id,
        ...formData,
        images: media ? media : [...imgOldURL],
      };

      const res = product
        ? await UpdateProduct(data)
        : await AddProduct({
            ...formData,
            images: [...imgOldURL, ...media],
          });

      setLoading(false);
      if (res.success) {
        toast.success(res.message);
        form.setValues({
          name: "",
          slug: "",
          price: "",
          brand: "",
          inStock: "",
          category: "",
          description: "",
        });
        setImages([]);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <>
      <Head>
        <title>CreateProduct - Shopfi</title>
      </Head>

      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-start md:items-start flex-col justify-center md:flex-row md:justify-between space-x-0 space-y-7 md:space-x-5 md:space-y-0 w-full h-auto bg-App_white_L lg:pt-12 lg:py-42 md:pt-12 md:py-56 pt-12 py-80 px-3">
        <div className="w-[90%] md:w-[70%] lg:w-[50%] bg-white py-7 px-4 shadow-md rounded-md mx-auto">
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            className="w-full mx-auto"
          >
            <TextInput
              required
              label="Product Name"
              placeholder="black tshit for men and womens"
              size="lg"
              radius="md"
              className="md:flex-1 w-full mx-auto mb-5"
              {...form.getInputProps("name")}
            />
            <TextInput
              required
              label="Product Slug"
              placeholder="black-tshit-for-men-and-womens"
              size="lg"
              radius="md"
              className="md:flex-1 w-full mx-auto mb-5"
              {...form.getInputProps("slug")}
            />
            <div className="w-full mt-12 flex flex-col items-start md:flex-row space-y-3 md:space-x-3 md:space-y-0">
              <TextInput
                required
                label="Product Price"
                placeholder="$100"
                size="lg"
                radius="md"
                className="md:flex-1 w-full mx-auto mb-5"
                {...form.getInputProps("price")}
              />

              <TextInput
                required
                label="Product Brand"
                placeholder="Nike"
                size="lg"
                radius="md"
                className="md:flex-1 w-full mx-auto mb-5"
                {...form.getInputProps("brand")}
              />
            </div>
            <div className="w-full flex flex-col items-start md:flex-row space-y-3 md:space-x-3 md:space-y-0">
              <NumberInput
                required
                placeholder="***********"
                label="In Stock Quantity"
                size="lg"
                radius="md"
                className="md:flex-1 w-full mx-auto mb-5"
                hideControls
                {...form.getInputProps("inStock")}
              />

              <NativeSelect
                data={allCategoriesData.map((data) => data.name)}
                label="Select your Category"
                size="lg"
                placeholder="Please Selecte A Category"
                radius="md"
                className="md:flex-1 w-full mx-auto mb-5 capitalize"
                required
                {...form.getInputProps("category")}
              />
            </div>

            <Textarea
              placeholder="Product description"
              label="Product description"
              size="lg"
              radius="md"
              className="md:flex-1 w-full mx-auto mb-5"
              autosize
              required
              {...form.getInputProps("description")}
            />

            <div className="flex w-full justify-between items-center mt-5 flex-col space-x-2 md:flex-row">
              <Button
                type="submit"
                className="text-lg bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out w-[80%] mx-auto lg:mx-0 md:w-[60%] lg:w-[40%] mt-2 h-12 "
                disabled={loading ? true : false}
              >
                {product ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </div>

        {/* upload images */}
        <div className="w-[100%] lg:w-[50%] h-72">
          <div className="w-full flex items-center gap-2 flex-wrap mb-4">
            <label
              htmlFor="filebutton"
              className="w-44 h-12 block text-white bg-App_green_L hover:bg-App_green_D rounded-md text-lg capitalize transition-all duration-150 ease-out mt-4 mx-0 p-0 font-medium cursor-pointer text-center leading-[47px]"
            >
              Upload Images
            </label>

            <input
              type="file"
              id="filebutton"
              multiple
              accept="image/*"
              onChange={handleUploadImage}
              style={{ visibility: "hidden", width: "0px", height: "0px" }}
            />

            <Button
              className="w-44 h-12 block text-white bg-red-600 hover:bg-red-700 rounded-md text-lg capitalize transition-all duration-150 ease-out mt-4 mx-0 p-0 font-medium cursor-pointer text-center"
              onClick={() => setImages([])}
              disabled={images.length == 0 ? true : false}
            >
              clear Images
            </Button>

            <span className="text-2xl text-App_green_L select-none font-bold ml-3">
              {images.length} images
            </span>
          </div>

          <div className="flex items-start lg:items-center gap-2 gap-x-3 flex-wrap">
            {images.map((img, index) => {
              console.log("img", img);
              return (
                <div
                  className="lg:first:w-full lg:first:h-[500px] w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] lg:first:mb-10 2xl:first:mb-36 relative"
                  key={index}
                >
                  <img
                    src={img?.imgURL ? img?.imgURL : URL.createObjectURL(img)}
                    alt="image"
                    className="w-full h-full object-cover object-center rounded transition-all duration-200 ease-out"
                  />

                  <Button
                    className="w-7 h-7 bg-red-600 cursor-pointer select-none rounded-full p-0 m-0 hover:bg-red-700 transition-all duration-150 ease-out absolute -top-2 -right-2 z-10"
                    onClick={() => Delete_The_Image(index)}
                  >
                    <MdClose className="text-white" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full bg-App_white_L pt-5 pb-3 gap-5">
        <Button
          className="w-44 h-12 !p-0 cursor-pointer !m-0 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-full"
          onClick={() => router.back()}
          leftIcon={<ArrowLeft strokeWidth={2} />}
        >
          Go Back
        </Button>
        <Button
          className="w-48 h-12 !p-0 cursor-pointer !m-0 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-full"
          onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}`)}
          leftIcon={<ArrowLeft strokeWidth={2} />}
        >
          Go To Home
        </Button>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const data = await GetAllCategories();
  let product = null;
  if (ctx.query.id) {
    product = await fetchTheProductByID(ctx.query.id);
  }

  return {
    props: { allCategoriesData: data, product },
  };
};

export default CreateProduct;
