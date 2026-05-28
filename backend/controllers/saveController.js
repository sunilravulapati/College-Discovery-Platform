import {
  saveCollegeService,
  getSavedCollegesService,
  removeSavedCollegeService,
} from "../services/saveService.js";

export const saveCollege = async (req, res, next) => {
  try {
    const result = await saveCollegeService(req.user.id, req.params.collegeId);
    return res
      .status(201)
      .json({ message: "college saved successfully", data: result });
  } catch (err) {
    next(err);
  }
};

export const getSavedColleges = async (req, res, next) => {
  try {
    const result = await getSavedCollegesService(req.user.id);
    return res
      .status(201)
      .json({ message: "colleges saved:", data: result });
  } catch (err) {
    next(err);
  }
};

export const removeSavedCollege = async (req, res, next) => {
  try {
    await removeSavedCollegeService(req.user.id, req.params.id);
    return res
      .status(200)
      .json({ message: "college removed from saved list" });
  } catch (err) {
    next(err);
  }
};
