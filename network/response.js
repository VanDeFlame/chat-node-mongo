function success(req, res, data, status) {
  res.status(status || 200).send({
    error: null,
    data,
  })
}

module.exports = { success }