const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    id: String,
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    trademark: String,
    distributor: String,
    origin: String,
    manufacture_date: String,
    price: Number,
    image_videos: String,
    piano_sound: String,
    geometry: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: { type: [Number], default: [0, 0] }
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
    retailer: { type: Schema.Types.ObjectId, ref: "Retailer" },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    },
    active: { type: Boolean, default: true },
    verified: Boolean,
    notes: String,
    images: [
      {
        url: String,
        _created_at: { type: Date, default: Date.now },
        tags: [String],
        active: {
          type: Boolean,
          default: true
        }
      }
    ],
    inMasterlist: Boolean,
    location: Object,
    pcc: String,
    user: Object,
    duplicate: Boolean,
    targetDetails: {
      type: Array,
      default: []
    },
    visitDetails: {
      type: Array,
      default: []
    },
    noticeDetails: {
      type: Array,
      default: []
    },
    target: {
      type: Boolean,
      default: false
    },
      visit: {
      type: Boolean,
      default: false
      },
      notice: {
      type: Boolean,
      default: false
      },
      noticeAmount:{
      type: Number,
      default: 0
      },
      tRatio: {
        type: Number,
        default: 0
      },
      vRatio: {
        type: Number,
        default: 0
      },
    _created_at: { type: Date, default: Date.now },
    _updated_at: { type: Date }
  })
);

function validateProduct(product) {
  const schema = Joi.object({
    id: Joi.string().allow(null, ""),
    brand: Joi.string()
      .min(1)
      .required(),
    model: Joi.string()
      .min(1)
      .required(),
    category: Joi.string()
      .min(1)
      .required(),
    trademark: Joi.string().allow(null, ""),
    distributor: Joi.string().allow(null, ""),
    origin: Joi.string().allow(null, ""),
    price: Joi.number().allow(null, ""),
    manufacture_date: Joi.string().allow(null, ""),
    image_videos: Joi.string().allow(null, ""),
    piano_sound: Joi.string().allow(null, ""),
    notes: Joi.string().allow(null, ""),
    images: Joi.array(),
    geometry: Joi.object({
      type: Joi.string(),
      coordinates: Joi.array()
    }),
    project: Joi.string(),
    agent: Joi.string(),
    retailer: Joi.string(),
    projectId: Joi.string(),
    agentId: Joi.string(),
    retailerId: Joi.string(),
    location: Joi.object().allow(null, ""),
    user: Joi.object().allow(null, ""),
    duplicate: Joi.boolean().allow(null, ""),
    inMasterlist: Joi.boolean().allow(null, ""),
    status: Joi.string().allow(null, ""),
    active: Joi.boolean().allow(null, ""),
    pcc: Joi.string().allow(null, ""),
    id: Joi.string().allow(null, ""),
    source: Joi.string().allow(null, ""),
    doblyyes: Joi.string().allow(null, ""),
    geo: Joi.object().allow(null, ""),
    _created_at: Joi.date().allow(null, ""),
    _updated_at: Joi.date().allow(null, ""),
    __v: Joi.allow(null, "")
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
