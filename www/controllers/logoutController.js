regius.controller('logoutCtrl', function ($scope, $state) {
    localStorage.removeItem("company");
    localStorage.removeItem("plan_id");
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    $state.go('login', {}, { reload: true });
});