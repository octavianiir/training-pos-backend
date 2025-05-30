module.exports = {
    error_badrequest: (res, msg) => res.status(400).json({msg}),
    error_unauthorized: (res, msg) => res.status(401).json({msg}),
    error_notfound: (res) => res.status(404).json(),
  }