const users = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const createError = require("http-errors");
const products = require("../model/productModel");

const { v4: uuidv4 } = require("uuid");

function filterObj(obj) {
  let filtered = {};
  const keys = Object.keys(obj).filter(
    (el, i) => el === "Name" || el === "Email"
  );
  keys.forEach((el, i) => {
    filtered[el] = obj[el];
  });
  return filtered;
}

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.Email || req.body.Name) {
    const updatedBody = filterObj(req.body);
    const user = await users.findById(req.user.id).select("+active");
    user.set(updatedBody);
    await user.save({ validateModifiedOnly: true });
    return res.status(200).json({
      message: "Details changed",
      data: {
        user,
      },
    });
  }
  return next(createError(400, "Please fill one of the fields to proceed"));
});

exports.userPaidForItem = catchAsync(async (req, res, next) => {
  const productId = req.body.id;
  if (!productId)
    return next(createError(400, "Something went wrong this request"));
  const paidItem = await users.findOneAndUpdate(
    { products: { $elemMatch: { _id: productId } } },
    { $set: { "products.$.productPaid": true } }
  );
  res.status(200).json({
    message: "Item successfully paid for",
  });
});

exports.checkIfUserHasPaidForItem = catchAsync(async (req, res, next) => {
  const isItemPaidFor = await users.findOne({
    products: { $elemMatch: { _id: req.body.id } },
    products: { $elemMatch: { productPaid: true } },
  });
  if (!isItemPaidFor)
    return next(
      createError(404, "The page your're looking for does not exiiists")
    );
  next();
});
