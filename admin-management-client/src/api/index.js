import ajax from "./ajax";

export const key = 'f51b2f475b9c2c8753ee35518f3f69fb'
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'post')
// export const reqAddUser = (user) => ajax('/login', user, 'post')
export const reqIp = (key) => ajax('https://restapi.amap.com/v3/ip', {key})
export const reqWeather = (city, key) => ajax('https://restapi.amap.com/v3/weather/weatherInfo', {city, key})
export const reqCategorys = (parentId) => ajax('/manage/category/list',{parentId})
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add',{parentId, categoryName}, 'post')
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update',{categoryId, categoryName}, 'post')
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})
//search products based on product name or description
export const reqSearchProducts = ({pageNum, pageSize, searchKey, searchType}) => {
     return ajax('/manage/product/search', {pageNum, pageSize, [searchType]:searchKey})
}
export const reqCategoryById = (categoryId) => ajax('/manage/category/info', {categoryId})
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status},'post')
export const reqDelImg = (name) => ajax('/manage/img/delete', {name}, 'post')
export const reqAddOrUpdateProduct = (product) => {
      return ajax('/manage/product/' + (product._id?'update':'add'), product, 'post')
}

export const reqRoleList = () => ajax('/manage/role/list')
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'post')
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'post')
export const reqUserList = () => ajax('/manage/user/list')
export const reqDelUser = (userId) => ajax('/manage/user/delete', {userId}, 'post')
export const reqAddUser = (user) => ajax('/manage/user/' + (user._id? 'update':'add'), user, 'post')