export default function wraAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(next);
    };
}

// const trycatchWrapper = (fn) => {
//     return async (req, res, next) => {
//         try {
//             await fn(req, res, next);
//         } catch (error) {
//             next(error);
//         }
//     };
// };

// export default trycatchWrapper;