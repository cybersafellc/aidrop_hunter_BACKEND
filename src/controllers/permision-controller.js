const permisionPage = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "access completed",
    }).end;
  } catch (error) {
    next(error);
  }
};

export default permisionPage;
