export function fail(status, message) { throw Object.assign(new Error(message), { status }); }
export function respondError(res, error) {
    const status = error.status ?? (error.name === 'ValidationError' || error.name === 'CastError' ? 400 : error.code === 11000 ? 409 : 500);
    return res.status(status).json({ success: false, message: status === 500 ? 'Internal server error' : error.message });
}
