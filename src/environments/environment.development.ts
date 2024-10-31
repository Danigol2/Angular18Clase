export const environment = {
    production: false,
    firebaseConfig : {
        apiKey: "AIzaSyBOMjqi9EhuVNdkQdQNE_1V4ShRPF_xpew",
        authDomain: "recetario-8078e.firebaseapp.com",
        projectId: "recetario-8078e",
        storageBucket: "recetario-8078e.appspot.com",
        messagingSenderId: "364566285691",
        appId: "1:364566285691:web:5d5c1dbc5928d300ec01de",
        measurementId: "G-6N6DPKEB3G"
      },
      api:{
        categories:'www.themealdb.com/api/json/v1/1/list.php?c=list',
        nationalities:'www.themealdb.com/api/json/v1/1/list.php?a=list',
        listByCategory:'www.themealdb.com/api/json/v1/1/filter.php?c=',
        listByNationality:'www.themealdb.com/api/json/v1/1/filter.php?a=',
        viewRecipe:'www.themealdb.com/api/json/v1/1/lookup.php?i='
      }
};
