"use strict"

var ProdcutIdToEdit = 0;

var ProdcutIdToDelete = 0;

function getProduct(next) {
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
  
    httpHelper.Get('api/product/?PageSize=' + PageSize + '&PageNumber=' + PageNumber , (data) => {
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

        $("#product-list-table tbody").empty();
        if (assetsData.length === 0) {
            $(".msg-no-records").show();
            $("#asset-list-div").hide();
            return;
        }
        $(".msg-no-records").hide();
        if (assetsData.length > 0) {
            $("#product-list-div").show();
        }
        assetsData.forEach(org => {
            let row = "<tr>";
            row += "<td>" + (org.PorductId  ?org.PorductId : "--"); + "</td>"; 
            row += "<td>" + (org.PorductName ? org.PorductName : "--") + "</td>";
            row += "<td>" + (org.CatgeoryId ? org.CatgeoryId : "--") + "</td>";
            row += "<td>" + (org.CategeoryName ? org.CategeoryName : "--") + "</td>";
            //row += "<td class='text-center'><span class='cursor pr-2'><img data-toggle='modal' data-target='#product-modal' onclick='setProductToEdit(" + org.PorductId +
            //    ",\"" + org.PorductName +
            //    "\"," + "\"" + org.CatgeoryId + "\"" +
            //    ")'><i class='fa fa-trash'></i></span> ";
            //row += "<td><span class='pr-2' data-toggle='tooltip' data-placement='top' title='Activity'> <a href='/../Asset/AssetActivity/" + org.PorductId + "'><i class='fa fa-trash'></i></a> </span><span data-toggle='tooltip' data-placement='top' title='Edit'> <a href='/../Assets/AddNewAsset/" + org.PorductId + "'><i class='fa fa-edit'></i> </span></td>";

            row += "<td class='text-center'><span class='cursor pr-2'><img src='/images/edit.png' data-toggle='modal' data-target='#product-modal' onclick='setProductToEdit(" + org.PorductId +
                ",\"" + org.PorductName +
                "\"," + "\"" + org.CatgeoryId + "\"" +
                ")'></span>"
                + "<span class='cursor'><img src='/images/delete.svg' class='ml-1' data-toggle='modal' onclick ='setProductToDelete(" + org.PorductId + ")' data-target='#delete-modal'></span>";
            row += "</td>";
            row += "</tr>";
            $("#product-list-table tbody").append(row);
        });
    }, () => {
    });
}

function setProductToEdit(id, name, categeoryId) {
    $("#name").val('');
    $("#save-button").text("Update Product");
    ProdcutIdToEdit = id;
    $("#name").val(name);
    $("#selected-categeory").val(categeoryId);
}

function setProductToDelete(id) {
    ProdcutIdToDelete = id;
}

function deleteElement() {
    httpHelper.Delete("api/product/" + parseInt(ProdcutIdToDelete), (data) => {
        var response = JSON.parse(data);
        toastr.info(response.errors.length > 0 ? response.errors[0] : "Product was deleted successfully Permantly.");
    },
        (data) => {
            var response = JSON.parse(data);
            toastr.info(response.errors.length > 0 ? response.errors[0] : "Product was deleted successfully Permantly.");
        });
    getProduct();

}

function setLocationToDelete(id) {
    locationIdToDelete = id;
}

function GetCategriesDropdown() {
    httpHelper.Get("api/categeory/get-categries", (data) => {
        let result = JSON.parse(data);
        result.forEach(org => {
            $("#selected-categeory").append('<option value="' + org.id + '">' + org.name + '</option>');
        });
    }, () => {
    });
}

$(function () {
    $("form[name='frm-product']").validate({
        rules: {
            name: "required",
            selectCategeory: "required",
        },
        submitHandler: function (form) {
            var productRequest = {
                productName: $("#name").val(),
                categoryId: parseInt($("#selected-categeory").val()),
            };
            if (ProdcutIdToEdit > 0) {
                httpHelper.Put("api/product/" + ProdcutIdToEdit, JSON.stringify(productRequest), (data) => {
                    toastr.info("Product was updated successfully.");
                    $("#product-modal").modal('hide');
                    ProdcutIdToEdit = 0;
                    getProduct();
                }, (data) => {
                    var response = JSON.parse(data);
                    toastr.error(response.errors[0]);
                });
                return;
            }
            httpHelper.Post("api/product/", JSON.stringify(productRequest), (data) => {
                toastr.success("Product was saved successfully.");
                getProduct();
            }, (data) => {
                var response = JSON.parse(data);
                toastr.error(response.errors[0]);
            });
        }
    });
});

function openProductForm() {
    $("#save-button").text("Add Product");
    $("#product-modal").modal('show');
    $("form[name='frm-product']")[0].reset()
}

$(document).ready(function () {
    $("#product-list-div").hide();
    $(".msg-no-records").hide();
    getProduct();
    GetCategriesDropdown();
});
