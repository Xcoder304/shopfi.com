import { useState, useEffect } from "react";
import { Button, TextInput, ActionIcon, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import Head from "next/head";
import { Pencil, Trash, ArrowLeft } from "tabler-icons-react";
import { Toaster, toast } from "react-hot-toast";
import {
  AddCategorie,
  DelecteTheCategories,
  GetAllCategories,
  UpdateTheCategories,
} from "../utils/DatabaseFuntions";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../Redux/features/OtherStateteSlice";

const ManageCategories = ({ allcategories }) => {
  const [categoriesData, setcategoriesData] = useState(allcategories);

  const userDetails = useSelector(selectUserDetails);
  const [isUpdate, setisUpdate] = useState(false);
  const [loading, setloading] = useState(false);
  const [categoryId, setcategoryId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (userDetails) {
      if (!userDetails?.isAdmin && !userDetails?.MainAdmin) {
        router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}`);
      }
    }
  }, [userDetails]);

  const form = useForm({
    initialValues: {
      CategorieName: "",
    },
  });

  const Get_The_Category_Name = (id, name) => {
    form.setValues({
      CategorieName: name,
    });
    setcategoryId(id);
    setisUpdate(true);
  };

  const Add_Category = async () => {
    setloading(true);
    if (form.values.CategorieName.length == 0) {
      toast.error("Please Write The Name of Category");
    } else {
      const res = await AddCategorie({
        name: form.values.CategorieName.toLocaleLowerCase(),
      });
      if (res.success) {
        router.replace(
          `${process.env.NEXT_PUBLIC_HOSTING_URL}/manageCategories`
        );
        form.setValues({
          CategorieName: "",
        });
        setisUpdate(false);
        setcategoryId(null);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
    setloading(false);
  };

  const Delete_The_Category = async (id, index) => {
    const newCategoriesArr = [...categoriesData];
    newCategoriesArr.splice(index, 1);
    setcategoriesData(newCategoriesArr);

    const res = await DelecteTheCategories(id);
    setisUpdate(false);
    setcategoryId(null);
    res.success
      ? toast.success(res.message)
      : toast.error("Something Went Try Again");
  };

  const Update_The_Category = async () => {
    setloading(true);
    const res = await UpdateTheCategories(
      categoryId,
      form.values.CategorieName
    );
    if (res.success) {
      router.replace(`${process.env.NEXT_PUBLIC_HOSTING_URL}/manageCategories`);
      form.setValues({
        CategorieName: "",
      });
      setisUpdate(false);
      setcategoryId(null);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setloading(false);
  };

  const Clear_The_Update = () => {
    setisUpdate(false);
    form.setValues({
      CategorieName: "",
    });
    setcategoryId(null);
  };

  return (
    <>
      <Head>
        <title>Manage Categorie - Shopfi</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      {(userDetails && userDetails?.isAdmin) || userDetails?.MainAdmin ? (
        <div className="w-full py-5">
          <div className="flex items-start justify-center flex-col pb-5  px-2  rounded-md mx-auto">
            <div className="flex items-center justify-center w-full">
              <form
                onSubmit={form.onSubmit((values) =>
                  console.log("register done")
                )}
                className="w-[95%] md:w-[80%] lg:w-[60%] mt-9 flex items-center flex-wrap gap-3"
              >
                <TextInput
                  required
                  placeholder="Categorie Name"
                  size="lg"
                  radius="md"
                  className="md:flex-1 w-[60%] mx-auto"
                  {...form.getInputProps("CategorieName")}
                />

                <Button
                  type="submit"
                  className="w-[25%] h-12 bg-App_green_L hover:bg-App_green_D hover:shadow-md transition-all duration-200 ease-out rounded-md text-white text-base"
                  onClick={isUpdate ? Update_The_Category : Add_Category}
                  disabled={loading ? true : false}
                >
                  {isUpdate ? "Update" : "Create"}
                </Button>

                {isUpdate && (
                  <Button
                    type="submit"
                    className="w-46 h-12 bg-red-600 hover:bg-red-700 hover:shadow-md transition-all duration-200 ease-out rounded-md text-white text-base"
                    onClick={Clear_The_Update}
                    disabled={loading ? true : false}
                  >
                    Clear Update
                  </Button>
                )}
              </form>
            </div>

            {/* Categories */}
            <div className="w-full mt-10">
              <h3 className="text-center text-App_blue_L font-medium text-2xl select-none mb-7">
                Categories - Total Categories {categoriesData.length}
              </h3>

              <div className="flex items-start justify-start w-full px-4 flex-wrap gap-4">
                {/* item */}
                {categoriesData.map(({ _id, name }, index) => {
                  return (
                    <div
                      className="w-auto py-4 shadow-md rounded-md px-5 bg-App_white_L flex items-center justify-between"
                      key={index}
                    >
                      <span className="text-lg font-medium text-left pr-5 capitalize">
                        {name}
                      </span>

                      <div>
                        <Group spacing={0} position="right">
                          <ActionIcon
                            onClick={() => Get_The_Category_Name(_id, name)}
                          >
                            <Pencil size={20} />
                          </ActionIcon>
                          <ActionIcon
                            color="red"
                            onClick={() => Delete_The_Category(_id, index)}
                          >
                            <Trash size={20} />
                          </ActionIcon>
                        </Group>
                      </div>
                    </div>
                  );
                })}

                {/*  */}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full pt-5 pb-3">
            <Button
              className="w-44 h-12 !p-0 cursor-pointer !m-0 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-full"
              onClick={() => router.back()}
              leftIcon={<ArrowLeft strokeWidth={2} />}
            >
              Go Back
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <h2 className="text-4xl text-red-600 font-bold capitalize">
            {" "}
            your are not Admin you Manage The Categories
          </h2>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const allcategories = await GetAllCategories();
  return {
    props: { allcategories },
  };
};

export default ManageCategories;
