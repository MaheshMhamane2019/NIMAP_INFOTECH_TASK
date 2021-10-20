
class HttpHelper {

    Get(url, success, error, token) {
        var request = new XMLHttpRequest()

        request.open('GET', url, true)

        request.onload = function () {
            success(this.response === '' ? null : this.response);
        }
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 401) {
            }
        }

        request.onerror = function () {
            if (error)
                error();
        }

        request.send();
    }

    Post(url, data, success, failure) {
        var request = new XMLHttpRequest();
        request.open("POST", url);

        request.setRequestHeader("Content-Type", "application/json");

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    success(this.response);
                }
                else if (request.status == 401) {
                }

                else if (request.status == 400) {
                    failure(this.response);
                }
            }
        }

        if (data)
            request.send(data);

        else
            request.send();
    }

    Put(url, data, success, failure) {
        var request = new XMLHttpRequest()

        request.open('PUT', url, true)

        request.setRequestHeader("Content-Type", "application/json");

        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                success(this.response);
            }

            else if (request.status == 401) {
              
            }

            else if (request.readyState == 4 && request.status == 400) {
                failure(this.response);
            }
            
        }

        if (data)
            request.send(data);

        else
            request.send();
    }

    Delete(url, success, failure) {
        var request = new XMLHttpRequest()
        request.open('DELETE', url, true)

        request.setRequestHeader("Content-Type", "application/json");

        request.onload = function () { 
            success(this.response);
        }

        request.send();
    }
}
let httpHelper = new HttpHelper();

