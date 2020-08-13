module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/api.js":
/*!********************!*\
  !*** ./lib/api.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const axios = __webpack_require__(/*! axios */ \"axios\");\n\nconst isServer = true;\nconst github_base_url = 'https://api.github.com';\n\nasync function requestGithub(method, url, data, headers = {}) {\n  return await axios({\n    method,\n    url: `${github_base_url}${url}`,\n    data,\n    headers\n  });\n}\n\nasync function request({\n  method = 'GET',\n  url,\n  data = {}\n}, req, res) {\n  if (!url) {\n    throw new Error('url must provide');\n  }\n\n  if (isServer) {\n    const headers = {};\n    const session = req.session;\n    const githubAuth = session.githubAuth || {};\n\n    if (githubAuth.access_token) {\n      headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;\n    }\n\n    return await requestGithub(method, url, data, headers);\n  }\n\n  return await axios({\n    method,\n    url: `/github${url}`,\n    data\n  });\n}\n\nmodule.exports = {\n  request,\n  requestGithub\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWIvYXBpLmpzP2FhODUiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiaXNTZXJ2ZXIiLCJnaXRodWJfYmFzZV91cmwiLCJyZXF1ZXN0R2l0aHViIiwibWV0aG9kIiwidXJsIiwiZGF0YSIsImhlYWRlcnMiLCJyZXF1ZXN0IiwicmVxIiwicmVzIiwiRXJyb3IiLCJzZXNzaW9uIiwiZ2l0aHViQXV0aCIsImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxLQUFLLEdBQUdDLG1CQUFPLENBQUMsb0JBQUQsQ0FBckI7O0FBRUEsTUFBTUMsUUFBUSxPQUFkO0FBRUEsTUFBTUMsZUFBZSxHQUFHLHdCQUF4Qjs7QUFFQSxlQUFlQyxhQUFmLENBQTZCQyxNQUE3QixFQUFxQ0MsR0FBckMsRUFBMENDLElBQTFDLEVBQWdEQyxPQUFPLEdBQUcsRUFBMUQsRUFBOEQ7QUFDMUQsU0FBTyxNQUFNUixLQUFLLENBQUM7QUFDZkssVUFEZTtBQUVmQyxPQUFHLEVBQUcsR0FBRUgsZUFBZ0IsR0FBRUcsR0FBSSxFQUZmO0FBR2ZDLFFBSGU7QUFJZkM7QUFKZSxHQUFELENBQWxCO0FBTUg7O0FBRUQsZUFBZUMsT0FBZixDQUF1QjtBQUFFSixRQUFNLEdBQUcsS0FBWDtBQUFrQkMsS0FBbEI7QUFBdUJDLE1BQUksR0FBRTtBQUE3QixDQUF2QixFQUEwREcsR0FBMUQsRUFBK0RDLEdBQS9ELEVBQW9FO0FBQ2hFLE1BQUksQ0FBQ0wsR0FBTCxFQUFVO0FBQ04sVUFBTSxJQUFJTSxLQUFKLENBQVUsa0JBQVYsQ0FBTjtBQUNIOztBQUNELE1BQUlWLFFBQUosRUFBYztBQUNWLFVBQU1NLE9BQU8sR0FBRyxFQUFoQjtBQUNBLFVBQU1LLE9BQU8sR0FBR0gsR0FBRyxDQUFDRyxPQUFwQjtBQUNBLFVBQU1DLFVBQVUsR0FBR0QsT0FBTyxDQUFDQyxVQUFSLElBQXNCLEVBQXpDOztBQUNBLFFBQUlBLFVBQVUsQ0FBQ0MsWUFBZixFQUE2QjtBQUN6QlAsYUFBTyxDQUFDLGVBQUQsQ0FBUCxHQUE0QixHQUFFTSxVQUFVLENBQUNFLFVBQVcsSUFBR0YsVUFBVSxDQUFDQyxZQUFhLEVBQS9FO0FBQ0g7O0FBQ0QsV0FBTyxNQUFNWCxhQUFhLENBQUNDLE1BQUQsRUFBU0MsR0FBVCxFQUFjQyxJQUFkLEVBQW9CQyxPQUFwQixDQUExQjtBQUNIOztBQUNELFNBQU8sTUFBTVIsS0FBSyxDQUFDO0FBQ2ZLLFVBRGU7QUFFZkMsT0FBRyxFQUFHLFVBQVNBLEdBQUksRUFGSjtBQUdmQztBQUhlLEdBQUQsQ0FBbEI7QUFLSDs7QUFFRFUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JULFNBRGE7QUFFYkw7QUFGYSxDQUFqQiIsImZpbGUiOiIuL2xpYi9hcGkuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJylcblxuY29uc3QgaXNTZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJ1xuXG5jb25zdCBnaXRodWJfYmFzZV91cmwgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSdcblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEdpdGh1YihtZXRob2QsIHVybCwgZGF0YSwgaGVhZGVycyA9IHt9KSB7XG4gICAgcmV0dXJuIGF3YWl0IGF4aW9zKHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICB1cmw6IGAke2dpdGh1Yl9iYXNlX3VybH0ke3VybH1gLFxuICAgICAgICBkYXRhLFxuICAgICAgICBoZWFkZXJzXG4gICAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdCh7IG1ldGhvZCA9ICdHRVQnLCB1cmwsIGRhdGEgPXt9IH0sIHJlcSwgcmVzKSB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1cmwgbXVzdCBwcm92aWRlJylcbiAgICB9XG4gICAgaWYgKGlzU2VydmVyKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fVxuICAgICAgICBjb25zdCBzZXNzaW9uID0gcmVxLnNlc3Npb25cbiAgICAgICAgY29uc3QgZ2l0aHViQXV0aCA9IHNlc3Npb24uZ2l0aHViQXV0aCB8fCB7fVxuICAgICAgICBpZiAoZ2l0aHViQXV0aC5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGAke2dpdGh1YkF1dGgudG9rZW5fdHlwZX0gJHtnaXRodWJBdXRoLmFjY2Vzc190b2tlbn1gXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlcXVlc3RHaXRodWIobWV0aG9kLCB1cmwsIGRhdGEsIGhlYWRlcnMpXG4gICAgfVxuICAgIHJldHVybiBhd2FpdCBheGlvcyh7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgdXJsOiBgL2dpdGh1YiR7dXJsfWAsXG4gICAgICAgIGRhdGFcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICByZXF1ZXN0LFxuICAgIHJlcXVlc3RHaXRodWJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./lib/api.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nconst api = __webpack_require__(/*! ../lib/api */ \"./lib/api.js\");\n\nconst Index = ({\n  userRepos,\n  userStarredRepos,\n  isLogin\n}) => {\n  console.log(userRepos, 'userRepos');\n  console.log(userStarredRepos, 'userStarredRepos');\n  console.log(isLogin, 'isLogin');\n  return __jsx(\"span\", null, \"Index\");\n};\n\nIndex.getInitialProps = async ({\n  ctx,\n  reduxStore\n}) => {\n  const user = reduxStore.getState().user;\n\n  if (!user || !user.id) {\n    return {\n      isLogin: false\n    };\n  }\n\n  const userRepos = await api.request({\n    url: '/user/repos'\n  }, ctx.req, ctx.res);\n  const userStarredRepos = await api.request({\n    url: '/user/starred'\n  }, ctx.req, ctx.res);\n  return {\n    isLogin: true,\n    userRepos: userRepos.data,\n    userStarredRepos: userStarredRepos.data\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Index);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbImFwaSIsInJlcXVpcmUiLCJJbmRleCIsInVzZXJSZXBvcyIsInVzZXJTdGFycmVkUmVwb3MiLCJpc0xvZ2luIiwiY29uc29sZSIsImxvZyIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsInJlZHV4U3RvcmUiLCJ1c2VyIiwiZ2V0U3RhdGUiLCJpZCIsInJlcXVlc3QiLCJ1cmwiLCJyZXEiLCJyZXMiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNQSxHQUFHLEdBQUdDLG1CQUFPLENBQUMsZ0NBQUQsQ0FBbkI7O0FBRUEsTUFBTUMsS0FBSyxHQUFHLENBQUM7QUFBRUMsV0FBRjtBQUFhQyxrQkFBYjtBQUErQkM7QUFBL0IsQ0FBRCxLQUE4QztBQUN4REMsU0FBTyxDQUFDQyxHQUFSLENBQVlKLFNBQVosRUFBdUIsV0FBdkI7QUFDQUcsU0FBTyxDQUFDQyxHQUFSLENBQVlILGdCQUFaLEVBQThCLGtCQUE5QjtBQUNBRSxTQUFPLENBQUNDLEdBQVIsQ0FBWUYsT0FBWixFQUFxQixTQUFyQjtBQUNBLFNBQ0ksNEJBREo7QUFHSCxDQVBEOztBQVNBSCxLQUFLLENBQUNNLGVBQU4sR0FBd0IsT0FBTztBQUFFQyxLQUFGO0FBQU9DO0FBQVAsQ0FBUCxLQUErQjtBQUNuRCxRQUFNQyxJQUFJLEdBQUdELFVBQVUsQ0FBQ0UsUUFBWCxHQUFzQkQsSUFBbkM7O0FBQ0EsTUFBSSxDQUFDQSxJQUFELElBQVMsQ0FBQ0EsSUFBSSxDQUFDRSxFQUFuQixFQUF1QjtBQUNuQixXQUFPO0FBQ0hSLGFBQU8sRUFBRTtBQUROLEtBQVA7QUFHSDs7QUFDRCxRQUFNRixTQUFTLEdBQUcsTUFBTUgsR0FBRyxDQUFDYyxPQUFKLENBQVk7QUFDaENDLE9BQUcsRUFBRTtBQUQyQixHQUFaLEVBRXJCTixHQUFHLENBQUNPLEdBRmlCLEVBRVpQLEdBQUcsQ0FBQ1EsR0FGUSxDQUF4QjtBQUdBLFFBQU1iLGdCQUFnQixHQUFHLE1BQU1KLEdBQUcsQ0FBQ2MsT0FBSixDQUFZO0FBQ3ZDQyxPQUFHLEVBQUU7QUFEa0MsR0FBWixFQUU1Qk4sR0FBRyxDQUFDTyxHQUZ3QixFQUVuQlAsR0FBRyxDQUFDUSxHQUZlLENBQS9CO0FBR0EsU0FBTztBQUNIWixXQUFPLEVBQUUsSUFETjtBQUVIRixhQUFTLEVBQUVBLFNBQVMsQ0FBQ2UsSUFGbEI7QUFHSGQsb0JBQWdCLEVBQUVBLGdCQUFnQixDQUFDYztBQUhoQyxHQUFQO0FBS0gsQ0FsQkQ7O0FBb0JlaEIsb0VBQWYiLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwaSA9IHJlcXVpcmUoJy4uL2xpYi9hcGknKVxuXG5jb25zdCBJbmRleCA9ICh7IHVzZXJSZXBvcywgdXNlclN0YXJyZWRSZXBvcywgaXNMb2dpbiB9KSA9PiB7XG4gICAgY29uc29sZS5sb2codXNlclJlcG9zLCAndXNlclJlcG9zJylcbiAgICBjb25zb2xlLmxvZyh1c2VyU3RhcnJlZFJlcG9zLCAndXNlclN0YXJyZWRSZXBvcycpXG4gICAgY29uc29sZS5sb2coaXNMb2dpbiwgJ2lzTG9naW4nKVxuICAgIHJldHVybiAoXG4gICAgICAgIDxzcGFuPkluZGV4PC9zcGFuPlxuICAgIClcbn1cblxuSW5kZXguZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKHsgY3R4LCByZWR1eFN0b3JlIH0pID0+IHtcbiAgICBjb25zdCB1c2VyID0gcmVkdXhTdG9yZS5nZXRTdGF0ZSgpLnVzZXJcbiAgICBpZiAoIXVzZXIgfHwgIXVzZXIuaWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTG9naW46IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdXNlclJlcG9zID0gYXdhaXQgYXBpLnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICcvdXNlci9yZXBvcydcbiAgICB9LCBjdHgucmVxLCBjdHgucmVzKVxuICAgIGNvbnN0IHVzZXJTdGFycmVkUmVwb3MgPSBhd2FpdCBhcGkucmVxdWVzdCh7XG4gICAgICAgIHVybDogJy91c2VyL3N0YXJyZWQnXG4gICAgfSwgY3R4LnJlcSwgY3R4LnJlcyApXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNMb2dpbjogdHJ1ZSxcbiAgICAgICAgdXNlclJlcG9zOiB1c2VyUmVwb3MuZGF0YSxcbiAgICAgICAgdXNlclN0YXJyZWRSZXBvczogdXNlclN0YXJyZWRSZXBvcy5kYXRhXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleDsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ })

/******/ });