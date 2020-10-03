import Category from "../../models/Category"

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.json(categories);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const addCategory = async (req, res) => {
  try {
    if (!req.body.name) throw "Category name is required";
    const category = await new Category({name: req.body.name}).save()
    res.json(category);
  } catch (error) {
    res.status(422).send({ error });
  }
}
