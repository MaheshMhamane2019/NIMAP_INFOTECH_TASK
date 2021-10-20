function getCategeory(next) {
    var paging = GetPagignation();
    var PageSize = $("#pages").val()
    var PageNumber = 1;
    if (next == 'next') {
        if (paging.hasNext != 'true') {
            return
        }
        else {
            PageNumber = paging.currentPage + 1
        }

    }
    else if (next == 'previous') {
        if (paging.hasPrevious != 'true') {
            return
        }
        else {
            PageNumber = paging.currentPage - 1
        }
    }
    if (PageNumber <= 0) { PageNumber = 1; }

    httpHelper.Get('api/categeory/?PageSize=' + PageSize + '&PageNumber=' + PageNumber, (data) => {
        let metadata = JSON.parse(data);
        let assetsData = metadata.result;
        var pagingdata = {
            currentPage: metadata.CurrentPage,
            hasNext: metadata.HasNext,
            hasPrevious: metadata.HasPrevious,
            totalPages: metadata.TotalPages
        }
        SetPagignation(pagingdata);

        let nextSize = (PageSize * parseInt(metadata.CurrentPage));
        let previousSize = (nextSize - PageSize) + 1;
        let pageNavigation = previousSize + " to " + nextSize + " of " + metadata.TotalPages;


        $("#total-count").text(metadata.TotalCount);
        $("#page-size").text(PageSize);
        $("#total-pages").text(metadata.TotalPages);
        $("#page-navigation").text(pageNavigation);



        $("#categeory-list-table tbody").empty();
        if (assetsData.length === 0) {
            $(".msg-no-records").show();
            $("#categeory-list-div").hide();
            return;
        }
        $(".msg-no-records").hide();
        if (assetsData.length > 0) {
            $("#categeory-list-div").show();
        }
        assetsData.forEach(org => {
            let row = "<tr>";
            row += "<td>" + (org.CatgeoryId ? org.CatgeoryId : "--") + "</td>";
            row += "<td>" + (org.CategeoryName ? org.CategeoryName : "--") + "</td>";
            row += "</td>";
            row += "</tr>";
            $("#categeory-list-table tbody").append(row);
        });
    }, () => {
    });
}

$(function () {
    $("form[name='frm-categeory']").validate({
        rules: {
            name: "required",
            selectCategeory: "required",
        },
        submitHandler: function (form) {
            var categoryRequest = {
                name: $("#name").val(),
            };
            if (CategeroyIdToEdit > 0) {
                httpHelper.Put("api/categeory/" + CategeroyIdToEdit, JSON.stringify(categoryRequest), (data) => {
                    toastr.info("Categeory was updated successfully.");
                    CategeroyIdToEdit = 0;
                    location.reload();
                }, (data) => {
                    var response = JSON.parse(data);
                    toastr.error(response.errors[0]);
                });
                return;
            }
            httpHelper.Post("api/categeory/", JSON.stringify(categoryRequest), (data) => {
                toastr.success("Categeory was saved successfully.");
                location.reload();
            }, (data) => {
                var response = JSON.parse(data);
                toastr.error(response.errors[0]);
            });
        }
    });
});

$(document).ready(function () {
    $("#categeory-list-div").hide();
    $(".msg-no-records").hide();
    getCategeory();
});
