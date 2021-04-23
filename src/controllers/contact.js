import Contact from '../entities/user';

/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods
 */

const all = async (req, res) => {
  const { limit, page } = req.query;
  const skip = parseInt(limit) * parseInt(page);
  try {
    const contacts = await Contact.find({active: true})
      .populate('user', 'name username email')
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 30);

    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
const get = async (req, res) => {
  const { _id } = req.params;
  try {
    const contact = await Contact.findById(_id).populate(
      'user',
      'name username email'
    );

    return res.status(200).json({ contact });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
const create = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  try {
    body.user = _id;
    const contact = await Contact(body);
    contact.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
const update = async (req, res) => {
  const { _id } = req.params;
  const { body } = req;
  try {
    const contact = await Contact.findById(_id).updateOne(body);

    return res.status(200).json({ contact });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
const remove = async (req, res) => {
  const { _id } = req.params;
  try {
    const contact = await Contact.findById(_id).updateOne({ active: false });

    return res.status(200).json({ contact });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export default {
  // get all contacts for a user
  all,
  // get a single contact
  get,
  // create a single contact
  create,
  // update a single contact
  update,
  // remove a single contact
  remove,
};
