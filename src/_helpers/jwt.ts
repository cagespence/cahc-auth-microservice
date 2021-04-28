import expressJwt from 'express-jwt';

const secret = process.env.SECRET!;
export default jwt;

function jwt() {
  return expressJwt({ secret, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
    ],
  });
}
