$(function() {
    
    currentFiltersConfiscari = {};
    currentFiltersCercetari = {};
    currentFiltersPedepse = {};
    currentFiltersActivitati = {};
    currentFiltersCampanii = {};
    currentFiltersUrgente = {};
    currentFiltersUrgente_drog = {};
    filtersFirstBarChartConfiscari = {};
    filtersSecondBarChartConfiscari = {};
    filtersPieChartInfractiuni = {};
    filtersFirstBarChartInfractiuni = {};
    filtersSecondBarChartInfractiuni = {};
    filtersFirstBarChartPrevenire = {};
    filtersSecondBarChartPrevenire = {};
    filtersPieChartUrgente = {};
    filtersFirstBarChartUrgente = {};
    filtersSecondBarChartUrgente = {};

    const token = localStorage.getItem("token");

    $.ajax({
        url: "/api/check_auth",
        type: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        success: function(data) { 
            console.log("Sunt logat");
        },
        error: function(e) {
            if(e.status === 401) {
               // $('#login_link').append("<p>Autentifica</p>");
                $('#login_link').attr("href", "/login.html");
                localStorage.setItem("token", "");
            } else if(e.status === 200) {
              //  $('#login_link').append("<p>Contul meu</p>");
                if(e.responseText === "admin") {
                    $('#login_link').attr("href", "/acasa.html");     // pagian separata pentru adin
                } else {
                    $('#login_link').attr("href", "/acasa.html");
                }
            }
        }
    });   

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPicker').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPicker').val(window.sessionStorage.getItem('an'));
                currentFiltersConfiscari['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(currentFiltersConfiscari);
        }
    });

    $.ajax({
        url: "/api/statistics/droguri",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#drogFilterPicker').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('nume_drog') && window.sessionStorage.getItem('nume_drog') !== 'undefined')
            {
                $('#drogFilterPicker').val(window.sessionStorage.getItem('nume_drog'));
                currentFiltersConfiscari['nume_drog'] = window.sessionStorage.getItem('nume_drog');
                window.sessionStorage.setItem('nume_drog', undefined);
            }
            console.log(currentFiltersConfiscari);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerFirstBarChartConfiscari').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('anFirstBarChartConfiscari') && window.sessionStorage.getItem('anFirstBarChartConfiscari') !== 'undefined')
            {
                $('#anFilterPickerFirstBarChartConfiscari').val(window.sessionStorage.getItem('anFirstBarChartConfiscari'));
                filtersFirstBarChartConfiscari['anFirstBarChartConfiscari'] = window.sessionStorage.getItem('anFirstBarChartConfiscari');
                window.sessionStorage.setItem('anFirstBarChartConfiscari', undefined);
            }
            console.log(filtersFirstBarChartConfiscari);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerSecondBarChartConfiscari').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('anSecondBarChartConfiscari') && window.sessionStorage.getItem('anSecondBarChartConfiscari') !== 'undefined')
            {
                $('#anFilterPickerSecondBarChartConfiscari').val(window.sessionStorage.getItem('anSecondBarChartConfiscari'));
                filtersSecondBarChartConfiscari['anSecondBarChartConfiscari'] = window.sessionStorage.getItem('anSecondBarChartConfiscari');
                window.sessionStorage.setItem('anSecondBarChartConfiscari', undefined);
            }
            console.log(filtersSecondBarChartConfiscari);
        }
    });

    $.ajax({
        url: "/api/statistics/persoane",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#persoaneFilterPickerCercetari').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('persoaneFilterPickerCercetari') && window.sessionStorage.getItems('persoaneFilterPickerCercetari') !== 'undefined')
            {
                $('#persoaneFilterPickerCercetari').val(window.sessionStorage.getItem('persoaneFilterPickerCercetari'));
                currentFiltersCercetari['persoaneFilterPickerCercetari'] = window.sessionStorage.getItem('persoaneFilterPickerCercetari');
                window.sessionStorage.setItem('persoaneFilterPickerCercetari', undefined);
            }
        }
    });

    $.ajax({
        url: "/api/statistics/pedepse",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#pedepseFilterPickerPedepse').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('pedepseFilterPickerPedepse') && window.sessionStorage.getItem('pedepseFilterPickerPedepse') !== 'undefined')
            {
                $('#pedepseFilterPickerPedepse').val(window.sessionStorage.getItem('pedepseFilterPickerPedepse'));
                currentFiltersPedepse['pedepseFilterPickerPedepse'] = window.sessionStorage.getItem('pedepseFilterPickerPedepse');
                window.sessionStorage.setItem('pedepseFilterPickerPedepse', undefined);
            }
            console.log(currentFiltersPedepse);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerCercetari').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerCercetari').val(window.sessionStorage.getItem('an'));
                currentFiltersCercetari['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(currentFiltersCercetari);
        }
    });
    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerPedepse').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerPedepse').val(window.sessionStorage.getItem('an'));
                currentFiltersPedepse['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(currentFiltersPedepse);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerPieChartInfractiuni').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerPieChartInfractiuni').val(window.sessionStorage.getItem('an'));
                filtersPieChartInfractiuni['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(filtersPieChartInfractiuni);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerFirstBarChartInfractiuni').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerFirstBarChartInfractiuni').val(window.sessionStorage.getItem('an'));
                filtersFirstBarChartInfractiuni['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(filtersFirstBarChartInfractiuni);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerSecondBarChartInfractiuni').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerSecondBarChartInfractiuni').val(window.sessionStorage.getItem('an'));
                filtersSecondBarChartInfractiuni['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(filtersSecondBarChartInfractiuni);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerActivitati').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerActivitati').val(window.sessionStorage.getItem('an'));
                currentFiltersActivitati['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(currentFiltersActivitati);
        }
    });

    $.ajax({
        url: "/api/statistics/locatii",
        type: "GET",
        success: function(data) {
            console.log(data); 
            data.map(element => {
                $('#locatieFilterPickerActivitati').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#locatieFilterPickerActivitati').val(window.sessionStorage.getItem('an'));
                currentFiltersActivitati['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(currentFiltersActivitati);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerCampanii').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerCampanii').val(window.sessionStorage.getItem('an'));
                currentFiltersCampanii['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(currentFiltersCampanii);
        }
    });

    $.ajax({
        url: "/api/statistics/nume_campanii",
        type: "GET",
        success: function(data) { 
            console.log(data);
            data.map(element => {
                $('#numeFilterPickerCampanii').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('nume') && window.sessionStorage.getItem('nume') !== 'undefined')
            {
                $('#numeFilterPickerCampanii').val(window.sessionStorage.getItem('nume'));
                currentFiltersCampanii['nume'] = window.sessionStorage.getItem('nume');
                window.sessionStorage.setItem('nume', undefined);
            }
            console.log(currentFiltersCampanii);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerFirstBarChartPrevenire').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerFirstBarChartPrevenire').val(window.sessionStorage.getItem('an'));
                filtersFirstBarChartPrevenire['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(filtersFirstBarChartPrevenire);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerSecondBarChartPrevenire').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerSecondBarChartPrevenire').val(window.sessionStorage.getItem('an'));
                filtersSecondBarChartPrevenire['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(filtersSecondBarChartPrevenire);
        }
    });
    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerUrgente').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerUrgente').val(window.sessionStorage.getItem('an'));
                currentFiltersUrgente['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(currentFiltersUrgente);
        }
    });

    $.ajax({
        url: "/api/statistics/urgente",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#urgentaFilterPickerUrgente').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('urgenta') && window.sessionStorage.getItem('urgenta') !== 'undefined')
            {
                $('#urgentaFilterPickerUrgente').val(window.sessionStorage.getItem('urgenta'));
                currentFiltersUrgente['urgenta'] = window.sessionStorage.getItem('urgenta');
                window.sessionStorage.setItem('urgenta', undefined);
            }
            console.log(currentFiltersUrgente);
        }
    });
    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerUrgente_drog').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerUrgente_drog').val(window.sessionStorage.getItem('an'));
                currentFiltersUrgente_drog['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(currentFiltersUrgente_drog);
        }
    });
    $.ajax({
        url: "/api/statistics/tip_droguri",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#drogFilterPickerUrgente_drog').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('drog') && window.sessionStorage.getItem('drog') !== 'undefined')
            {
                $('#drogFilterPickerUrgente_drog').val(window.sessionStorage.getItem('drog'));
                currentFiltersUrgente_drog['drog'] = window.sessionStorage.getItem('drog');
                window.sessionStorage.setItem('drog', undefined);
            }
            console.log(currentFiltersUrgente_drog);
        }
    });

    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerPieChartUrgente').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerPieChartUrgente').val(window.sessionStorage.getItem('an'));
                filtersPieChartUrgente['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(filtersPieChartUrgente);
        }
    });
    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerFirstBarChartUrgente').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerFirstBarChartUrgente').val(window.sessionStorage.getItem('an'));
                filtersFirstBarChartUrgente['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(filtersFirstBarChartUrgente);
        }
    });
    $.ajax({
        url: "/api/statistics/ani",
        type: "GET",
        success: function(data) { 
            data.map(element => {
                $('#anFilterPickerSecondBarChartUrgente').append(`<option value=${element}>${element}</option>`)
            });

            if(window.sessionStorage.getItem('an') && window.sessionStorage.getItem('an') !== 'undefined')
            {
                $('#anFilterPickerSecondBarChartUrgente').val(window.sessionStorage.getItem('an'));
                filtersSecondBarChartUrgente['an'] = window.sessionStorage.getItem('an');
                window.sessionStorage.setItem('an', undefined);
            }
            console.log(filtersSecondBarChartUrgente);
        }
    });


    // verificam pagina pe care suntem sa stim ce chart uri incarcam
    if ($('#lineChartConfiscari').length > 0) {
         reloadLineAndBarChartConfiscari();
    }
    if ($('#lineChartInfractiuni').length > 0) {
        reloadLineChartInfractiuni();
        reloadBarChartInfractiuni();
   }
   if ($('#lineChartPrevenire').length > 0) {
        reloadLineChartPrevenire();
        reloadBarChartPrevenire();
    }
    if ($('#lineChartUrgente').length > 0) {
        reloadLineChartUrgente();
    }
    if ($('#admin_account').length > 0) {
       if (window.localStorage.getItem("role") === "admin") {
        $('#admin_account').append(`
            <a class="btn" href="/administrare.html"><i class="fa fa-buton"></i> Administrare</a>
        `);
       }
    }
    if ($('#usersTable').length > 0) {
        reloadUsersTable();
    }



    $('#anFilterPicker').on('change', function() {
        currentFiltersConfiscari['an'] = this.value;
        reloadTableData();
    });
    $('#drogFilterPicker').on('change', function() {
        currentFiltersConfiscari['nume_drog'] = this.value;
        reloadTableData();
    });
    $('#anFilterPickerFirstBarChartConfiscari').on('change', function() {
        filtersFirstBarChartConfiscari['anFirstBarChartConfiscari'] = this.value;
        reloadFirstBarChartConfiscari();
    });
    $('#anFilterPickerSecondBarChartConfiscari').on('change', function() {
        filtersSecondBarChartConfiscari['anSecondBarChartConfiscari'] = this.value;
        reloadSecondBarChartConfiscari();
    });
    $('#anFilterPickerCercetari').on('change', function() {
        currentFiltersCercetari['an'] = this.value;
        reloadTableDataCercetari();
    });
    $('#persoaneFilterPickerCercetari').on('change', function() {
        currentFiltersCercetari['tip_persoane'] = $(this).find("option:selected").text();
        reloadTableDataCercetari();
    });
    $('#anFilterPickerPedepse').on('change', function() {
        currentFiltersPedepse['an'] = this.value;
        reloadTableDataPedepse();
    });
    $('#pedepseFilterPickerPedepse').on('change', function() {
        currentFiltersPedepse['hotarare'] = $(this).find("option:selected").text();
        reloadTableDataPedepse();
    });
    $('#anFilterPickerPieChartInfractiuni').on('change', function() {
        filtersPieChartInfractiuni['an'] = this.value;
        reloadPieChartInfractiuni();
    });
    $('#anFilterPickerFirstBarChartInfractiuni').on('change', function() {
        filtersFirstBarChartInfractiuni['an'] = this.value;
        reloadFirstBarChartInfractiuni();
    });
    $('#anFilterPickerSecondBarChartInfractiuni').on('change', function() {
        filtersSecondBarChartInfractiuni['an'] = this.value;
        reloadSecondBarChartInfractiuni();
    });
    $('#anFilterPickerActivitati').on('change', function() {
        currentFiltersActivitati['an'] = this.value;
        reloadTableDataActivitati();
    });
    $('#locatieFilterPickerActivitati').on('change', function() {
        currentFiltersActivitati['locatie'] = $(this).find("option:selected").text();
        reloadTableDataActivitati();
    });
    $('#anFilterPickerCampanii').on('change', function() {
        currentFiltersCampanii['an'] = this.value;
        reloadTableDataCampanii();
    });
    $('#numeFilterPickerCampanii').on('change', function() {
        currentFiltersCampanii['nume'] = $(this).find("option:selected").text();
        reloadTableDataCampanii();
    });
    $('#anFilterPickerFirstBarChartPrevenire').on('change', function() {
        filtersFirstBarChartPrevenire['an'] = this.value;
        reloadFirstBarChartPrevenire();
    });
    $('#anFilterPickerSecondBarChartPrevenire').on('change', function() {
        filtersSecondBarChartPrevenire['an'] = this.value;
        reloadSecondBarChartPrevenire();
    });
    $('#anFilterPickerUrgente').on('change', function() {
        currentFiltersUrgente['an'] = this.value;
        reloadTableDataUrgente();
    });
    $('#urgentaFilterPickerUrgente').on('change', function() {
        currentFiltersUrgente['urgenta'] =  $(this).find("option:selected").text();
        reloadTableDataUrgente();
    });
    $('#anFilterPickerUrgente_drog').on('change', function() {
        currentFiltersUrgente_drog['an'] = this.value;
        reloadTableDataUrgente_drog();
    });
    $('#drogFilterPickerUrgente_drog').on('change', function() {
        currentFiltersUrgente_drog['drog'] =  $(this).find("option:selected").text();
        reloadTableDataUrgente_drog();
    });
    $('#anFilterPickerPieChartUrgente').on('change', function() {
        filtersPieChartUrgente['an'] =  this.value;
        reloadPieChartUrgente();
    });
    $('#anFilterPickerFirstBarChartUrgente').on('change', function() {
        filtersFirstBarChartUrgente['an'] =  this.value;
        reloadFirstBarChartUrgente();
    });
    $('#anFilterPickerSecondBarChartUrgente').on('change', function() {
        filtersSecondBarChartUrgente['an'] =  this.value;
        reloadSecondBarChartUrgente();
    });

    
    // pt apasarea pe download
    $('#lineChartConfiscariDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('lineChartConfiscari'));
    });
    $('#barChartConfiscariDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('barChartConfiscari'));
    });
    $('#secondBarChartDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('secondBarChartConfiscari'));
    });
    $('#firstBarChartDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('firstBarChartConfiscari'));
    });
    $('#lineChartInfractiuniDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('lineChartInfractiuni'));
    });
    $('#barChartInfractiuniDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('barChartInfractiuni'));
    });
    $('#firstBarChartInfractiuniDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('firstBarChartInfractiuni'));
    });
    $('#secondBarChartInfractiuniDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('secondBarChartInfractiuni'));
    });
    $('#lineChartPrevenireDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('lineChartPrevenire'));
    });
    $('#barChartPrevenireDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('barChartPrevenire'));
    });
    $('#firstBarChartPrevenireDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('firstBarChartPrevenire'));
    });
    $('#secondBarChartPrevenireDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('secondBarChartPrevenire'));
    });
    $('#lineChartUrgenteDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('lineChartUrgente'));
    });
    $('#pieChartUrgenteDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('pieChartUrgente'));
    });
    $('#firstBarChartUrgenteDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('firstBarChartUrgente'));
    });
    $('#secondBarChartUrgenteDownloadPNGButton').on('dblclick', function() {
        downloadAsPng(document.getElementById('secondBarChartUrgente'));
    });


    // incarcam chart uri in functie de pagina
    if ($('#anFilterPickerSecondBarChartConfiscari').length > 0) {
        reloadFirstBarChartConfiscari();
        reloadSecondBarChartConfiscari();
        reloadTableData();
    }
    if ($('#anFilterPickerCercetari').length > 0) {
        reloadTableDataCercetari();
        reloadTableDataPedepse();
        reloadPieChartInfractiuni();
        reloadFirstBarChartInfractiuni();
        reloadSecondBarChartInfractiuni();
    }
    if ($('#anFilterPickerActivitati').length > 0) {
        reloadTableDataActivitati();
        reloadTableDataCampanii();
        reloadFirstBarChartPrevenire();
        reloadSecondBarChartPrevenire();
    }
    if ($('#urgentaFilterPickerUrgente').length > 0) {
        reloadTableDataUrgente();
        reloadTableDataUrgente_drog();
        reloadPieChartUrgente();
        reloadFirstBarChartUrgente();
        reloadSecondBarChartUrgente();
    }

})

function reloadFirstBarChartConfiscari() {
    let query =  `/api/statistics/confiscari_bar?`;
        query = `${query}&an=${filtersFirstBarChartConfiscari['anFirstBarChartConfiscari']}`;

    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            var labels = [];
            var values = [];
            data.elements.forEach(function(item) {
                labels.push(item.nume_drog);
                values.push(item.nr_capturi);
            });
            console.log(labels);
            console.log(values);
            redrawFirstBarChartConfiscari(labels, values);
        }
    });
}

function reloadSecondBarChartConfiscari() {
    let query =  `/api/statistics/confiscari_bar?`;
        query = `${query}&an=${filtersSecondBarChartConfiscari['anSecondBarChartConfiscari']}`;

    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var values = [];
            data.elements.forEach(function(item) {
                labels.push(item.nume_drog);
                values.push(item.grame);
            });
            console.log(labels);
            console.log(values);
            redrawSecondBarChartConfiscari(labels, values);
        }
    });
}

function reloadLineAndBarChartConfiscari() {
    let query = `/api/statistics/confiscari_line`;
    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var capturi = [];
            var grame = [];
            data.elements.forEach(function(item) {
                labels.push(item.an);
                grame.push(item.grame);
                capturi.push(item.nr_capturi);
            });
            redrawLineChartConfiscari(labels, grame);
            redrawBarChartConfiscari(labels, capturi)
        }
    });
}

function reloadLineChartInfractiuni() {
    let query = `/api/statistics/infractiuni_line`;
    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var nr_persoane = [];
            data.elements.forEach(function(item) {
                labels.push(item.an);
                nr_persoane.push(item.nr_persoane);
            });
            redrawLineChartInfractiuni(labels, nr_persoane);
        }
    });
}


function reloadBarChartInfractiuni() {
    let query = `/api/statistics/infractiuni_bar`;
    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var nr_pedepse = [];
            data.elements.forEach(function(item) {
                labels.push(item.an);
                nr_pedepse.push(item.nr_pedepse);
            });
            redrawBarChartInfractiuni(labels, nr_pedepse);
        }
    });
}

function reloadLineChartPrevenire() {
    let query = `/api/statistics/prevenire_line`;
    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var nr_beneficiari = [];
            data.elements.forEach(function(item) {
                labels.push(item.an);
                nr_beneficiari.push(item.nr_beneficiari);
            });
            redrawLineChartPrevenire(labels, nr_beneficiari);
        }
    });
}


function reloadBarChartPrevenire() {
    let query = `/api/statistics/prevenire_bar`;
    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var nr_activitati = [];
            data.elements.forEach(function(item) {
                labels.push(item.an);
                nr_activitati.push(item.nr_activitati);
            });
            redrawBarChartPrevenire(labels, nr_activitati);
        }
    });
}


function reloadTableData() {  

    document.getElementById("statisticsDataTable").innerHTML = "";
    let query = `/api/statistics/confiscari_tabel?`;
    if(currentFiltersConfiscari['an'] && currentFiltersConfiscari['an'] != 'TOATE')
    {
        query = `${query}&an=${currentFiltersConfiscari['an']}`;
    }
    if(currentFiltersConfiscari['nume_drog'] && currentFiltersConfiscari['nume_drog'] != 'TOATE')
    {
        query = `${query}&nume_drog=${currentFiltersConfiscari['nume_drog'].replace(" ", "_")}`;
    }

    $.ajax({
        url: query,
        type: "GET",
        success: function(data) { 
            data['elements'].map(row => {
                $('#statisticsDataTable').append(`
                <tr>
                <td>${row['an']}</td>
                <td>${row['nume_drog']}</td>
                <td>${row['grame']}</td>
                <td>${row['nr_capturi']}</td>
                </tr>`
              );
            });
        }
    });

}

// PENTRU TABELA CERCETARI !!
function reloadTableDataCercetari() {  

    document.getElementById("statisticsDataTableCercetari").innerHTML = "";
    let query = `/api/statistics/cercetari_tabel?`;
    if(currentFiltersCercetari['an'] && currentFiltersCercetari['an'] != 'TOATE')
    {
        query = `${query}&an=${currentFiltersCercetari['an']}`;
    }
    if(currentFiltersCercetari['tip_persoane'] && currentFiltersCercetari['tip_persoane'] != 'TOATE')
    {
        query = `${query}&tip_persoane=${currentFiltersCercetari['tip_persoane'].replace(" ", "_")}`;
    }
    $.ajax({
        url: query,
        type: "GET",
        success: function(data) { 
            data['elements'].map(row => {
                $('#statisticsDataTableCercetari').append(`
                <tr>
                <td>${row['an']}</td>
                <td>${row['tip_persoane']}</td>
                <td>${row['nr_persoane']}</td>
                </tr>`
              );
            });
        }
    });
}

// PENTRU TABELA PEDEPSE !!
function reloadTableDataPedepse() {  

    document.getElementById("statisticsDataTablePedepse").innerHTML = "";
    let query = `/api/statistics/pedepse_tabel?`;
    if(currentFiltersPedepse['an'] && currentFiltersPedepse['an'] != 'TOATE')
    {
        query = `${query}&an=${currentFiltersPedepse['an']}`;
    }
    if(currentFiltersPedepse['hotarare'] && currentFiltersPedepse['hotarare'] != 'TOATE')
    {
        query = `${query}&hotarare=${currentFiltersPedepse['hotarare'].replace(" ", "_")}`;
    }
    $.ajax({
        url: query,
        type: "GET",
        success: function(data) { 
            data['elements'].map(row => {
                $('#statisticsDataTablePedepse').append(`
                <tr>
                <td>${row['an']}</td>
                <td>${row['hotarare']}</td>
                <td>${row['nr_pedepse']}</td>
                </tr>`
              );
            });
        }
    });
}

// PENTRU TABELA ACTIVITATI
function reloadTableDataActivitati() {  

    document.getElementById("statisticsDataTableActivitati").innerHTML = "";
    let query = `/api/statistics/activitati_tabel?`;
    if(currentFiltersActivitati['an'] && currentFiltersActivitati['an'] != 'TOATE')
    {
        query = `${query}&an=${currentFiltersActivitati['an']}`;
    }
    if(currentFiltersActivitati['locatie'] && currentFiltersActivitati['locatie'] != 'TOATE')
    {
        query = `${query}&locatie=${currentFiltersActivitati['locatie'].replace(" ", "_")}`;
    }
    $.ajax({
        url: query,
        type: "GET",
        success: function(data) { 
            data['elements'].map(row => {
                $('#statisticsDataTableActivitati').append(`
                <tr>
                <td>${row['an']}</td>
                <td>${row['locatie']}</td>
                <td>${row['nr_activitati']}</td>
                </tr>`
              );
            });
        }
    });
}
//  PENTRU TABELA CAMPANII
function reloadTableDataCampanii() {  

    document.getElementById("statisticsDataTableCampanii").innerHTML = "";
    let query = `/api/statistics/campanii_tabel?`;
    if(currentFiltersCampanii['an'] && currentFiltersCampanii['an'] != 'TOATE')
    {
        query = `${query}&an=${currentFiltersCampanii['an']}`;
    }
    if(currentFiltersCampanii['nume'] && currentFiltersCampanii['nume'] != 'TOATE')
    {
        query = `${query}&nume=${currentFiltersCampanii['nume'].replace(" ", "_")}`;
    }
    $.ajax({
        url: query,
        type: "GET",
        success: function(data) { 
            data['elements'].map(row => {
                $('#statisticsDataTableCampanii').append(`
                <tr>
                <td>${row['an']}</td>
                <td>${row['nume']}</td>
                <td>${row['nr_beneficiari']}</td>
                </tr>`
              );
            });
        }
    });
}
//  PENTRU TABELA URGENTE
function reloadTableDataUrgente() {  

    document.getElementById("statisticsDataTableUrgente").innerHTML = "";
    let query = `/api/statistics/urgente_tabel?`;
    if(currentFiltersUrgente['an'] && currentFiltersUrgente['an'] != 'TOATE')
    {
        query = `${query}&an=${currentFiltersUrgente['an']}`;
    }
    if(currentFiltersUrgente['urgenta'] && currentFiltersUrgente['urgenta'] != 'TOATE')
    {
        query = `${query}&urgenta=${currentFiltersUrgente['urgenta'].replace(" ", "_")}`;
    }
    $.ajax({
        url: query,
        type: "GET",
        success: function(data) { 
            data['elements'].map(row => {
                $('#statisticsDataTableUrgente').append(`
                <tr>
                <td>${row['an']}</td>
                <td>${row['urgenta']}</td>
                <td>${row['nr_urgente']}</td>
                </tr>`
              );
            });
        }
    });
}
//------------------------------------------------------------------
// PT TABELA URGENTE_DROG
function reloadTableDataUrgente_drog() {  

    document.getElementById("statisticsDataTableUrgente_drog").innerHTML = "";
    let query = `/api/statistics/urgente_drog_tabel?`;
    if(currentFiltersUrgente_drog['an'] && currentFiltersUrgente_drog['an'] != 'TOATE')
    {
        query = `${query}&an=${currentFiltersUrgente_drog['an']}`;
    }
    if(currentFiltersUrgente_drog['drog'] && currentFiltersUrgente_drog['drog'] != 'TOATE')
    {
        query = `${query}&drog=${currentFiltersUrgente_drog['drog'].replace(" ", "_")}`;
    }
    $.ajax({
        url: query,
        type: "GET",
        success: function(data) { 
            data['elements'].map(row => {
                $('#statisticsDataTableUrgente_drog').append(`
                <tr>
                <td>${row['an']}</td>
                <td>${row['drog']}</td>
                <td>${row['nr_urgente']}</td>
                </tr>`
              );
            });
        }
    });
}

//---------------------------------------------
// PT TABELA USERS
function reloadUsersTable() {  
    document.getElementById("usersTable").innerHTML = "";
    let query = `/api/statistics/users_tabel`;
    $.ajax({
        url: query,
        type: "GET",
        success: function(data) { 
            data['elements'].map(row => {
                $('#usersTable').append(`
                <tr>
                <td>${row['username']}</td>
                <td>${row['last_login']}</td>
                </tr>`
              );
            });
        }
    });

}

function reloadPieChartInfractiuni() {
    let query = `/api/statistics/infractiuni_pie?`;
        query = `${query}&an=${filtersPieChartInfractiuni['an']}`;
    console.log(query);
    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            var labels = [];
            var nr_persoane = [];
            data.elements.forEach(function(item) {
                labels.push(item.gen);
                nr_persoane.push(item.nr_persoane);
            });
            redrawPieChartInfractiuni(labels, nr_persoane);
        }
    });
}

function reloadFirstBarChartInfractiuni() {
    let query = `/api/statistics/infractiuni_cercetari?`;
    query = `${query}&an=${filtersFirstBarChartInfractiuni['an']}`;
    console.log(query);
$.ajax({
    url: query,
    type: "GET",
    dataType: "json",
    success: function(data) {
        var labels = [];
        var nr_persoane = [];
        data.elements.forEach(function(item) {
            labels.push(item.tip_persoane);
            nr_persoane.push(item.nr_persoane);
        });
        redrawFirstBarChartInfractiuni(labels, nr_persoane);
    }
});
}

function reloadSecondBarChartInfractiuni() {
    let query = `/api/statistics/infractiuni_pedepse?`;
    query = `${query}&an=${filtersSecondBarChartInfractiuni['an']}`;
    console.log(query);
$.ajax({
    url: query,
    type: "GET",
    dataType: "json",
    success: function(data) {
        var labels = [];
        var nr_pedepse = [];
        data.elements.forEach(function(item) {
            labels.push(item.hotarare);
            nr_pedepse.push(item.nr_pedepse);
        });
        redrawSecondBarChartInfractiuni(labels, nr_pedepse);
    }
});
}

function reloadFirstBarChartPrevenire() {
    let query =  `/api/statistics/prevenire_campanii?`;
        query = `${query}&an=${filtersFirstBarChartPrevenire['an']}`;

    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var values = [];
            data.elements.forEach(function(item) {
                labels.push(item.nume);
                values.push(item.nr_beneficiari);
            });
            console.log(labels);
            console.log(values);
            redrawFirstBarChartPrevenire(labels, values);
        }
    });
}

function reloadSecondBarChartPrevenire() {
    let query =  `/api/statistics/prevenire_proiecte?`;
        query = `${query}&an=${filtersSecondBarChartPrevenire['an']}`;

    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var values = [];
            data.elements.forEach(function(item) {
                labels.push(item.nume);
                values.push(item.nr_beneficiari);
            });
            console.log(labels);
            console.log(values);
            redrawSecondBarChartPrevenire(labels, values);
        }
    });
}
function reloadLineChartUrgente() {
    let query = `/api/statistics/urgente_line`;
    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var labels = [];
            var nr_urgente = [];
            data.elements.forEach(function(item) {
                labels.push(item.an);
                nr_urgente.push(item.nr_urgente);
            });
            redrawLineChartUrgente(labels, nr_urgente);
        }
    });
}
function reloadPieChartUrgente() {
    let query = `/api/statistics/urgente_pie?`;
        query = `${query}&an=${filtersPieChartUrgente['an']}`;
    console.log(query);
    $.ajax({
        url: query,
        type: "GET",
        dataType: "json",
        success: function(data) {
            var labels = [];
            var nr_urgente = [];
            data.elements.forEach(function(item) {
                labels.push(item.gen);
                nr_urgente.push(item.nr_urgente);
            });
            redrawPieChartUrgente(labels, nr_urgente);
        }
    });
}

function reloadFirstBarChartUrgente() {
    let query = `/api/statistics/urgente_bar?`;
    query = `${query}&an=${filtersFirstBarChartUrgente['an']}`;
    console.log(query);
$.ajax({
    url: query,
    type: "GET",
    dataType: "json",
    success: function(data) {
        var labels = [];
        var nr_urgente = [];
        data.elements.forEach(function(item) {
            labels.push(item.urgenta);
            nr_urgente.push(item.nr_urgente);
        });
        redrawFirstBarChartUrgente(labels, nr_urgente);
    }
});
}

function reloadSecondBarChartUrgente() {
    let query = `/api/statistics/urgente_drog_bar?`;
    query = `${query}&an=${filtersSecondBarChartUrgente['an']}`;
    console.log(query);
$.ajax({
    url: query,
    type: "GET",
    dataType: "json",
    success: function(data) {
        var labels = [];
        var nr_urgente = [];
        data.elements.forEach(function(item) {
            labels.push(item.drog);
            nr_urgente.push(item.nr_urgente);
        });
        redrawSecondBarChartUrgente(labels, nr_urgente);
    }
});
}

//--------------------------------------------------------------------------

function downloadConfiscariCSV() {
    $('#statisticsConfiscariDownloadCSVButton').prop('disabled', true);
    let payload = {};
    if(currentFiltersConfiscari['an'] && currentFiltersConfiscari['an'] != 'TOATE') {
        payload['an'] = currentFiltersConfiscari['an'].replace("_", " ");
    }
    if(currentFiltersConfiscari['nume_drog'] && currentFiltersConfiscari['nume_drog'] != 'TOATE') {
        payload['nume_drog'] = currentFiltersConfiscari['nume_drog'].replace("_", " ");
    }
    $.ajax({
        url: "/api/statistics/confiscari_generate_csv",
        type: "POST",
        data: JSON.stringify(payload),
        success: function(data) { 
            window.location.href = data;
            $('#statisticsConfiscariDownloadCSVButton').prop('disabled', false);
        },
        error: function(e) {
            alert("Eroare la generarea fisierului");
            $('#statisticsConfiscariDownloadCSVButton').prop('disabled', false);
        }
    });   
}
function downloadCercetariCSV() {
    $('#statisticsCercetariDownloadCSVButton').prop('disabled', true);
    let payload = {};
    if(currentFiltersCercetari['an'] && currentFiltersCercetari['an'] != 'TOATE') {
        payload['an'] = currentFiltersCercetari['an'].replace("_", " ");
    }
    if(currentFiltersCercetari['tip_persoane'] && currentFiltersCercetari['tip_persoane'] != 'TOATE') {
        payload['tip_persoane'] = currentFiltersCercetari['tip_persoane'].replace("_", " ");
    }
    $.ajax({
        url: "/api/statistics/cercetari_generate_csv",
        type: "POST",
        data: JSON.stringify(payload),
        success: function(data) { 
            window.location.href = data;
            $('#statisticsCercetariDownloadCSVButton').prop('disabled', false);
        },
        error: function(e) {
            alert("Eroare la generarea fisierului");
            $('#statisticsCercetariDownloadCSVButton').prop('disabled', false);
        }
    });   
}
function downloadPedepseCSV() {
    $('#statisticsPedepseDownloadCSVButton').prop('disabled', true);
    let payload = {};
    if(currentFiltersPedepse['an'] && currentFiltersPedepse['an'] != 'TOATE') {
        payload['an'] = currentFiltersPedepse['an'].replace("_", " ");
    }
    if(currentFiltersPedepse['hotarare'] && currentFiltersPedepse['hotarare'] != 'TOATE') {
        payload['hotarare'] = currentFiltersPedepse['hotarare'].replace("_", " ");
    }
    $.ajax({
        url: "/api/statistics/pedepse_generate_csv",
        type: "POST",
        data: JSON.stringify(payload),
        success: function(data) { 
            window.location.href = data;
            $('#statisticsPedepseDownloadCSVButton').prop('disabled', false);
        },
        error: function(e) {
            alert("Eroare la generarea fisierului");
            $('#statisticsPedepseDownloadCSVButton').prop('disabled', false);
        }
    });   
}
function downloadActivitatiCSV() {
    $('#statisticsActivitatiDownloadCSVButton').prop('disabled', true);
    let payload = {};
    if(currentFiltersActivitati['an'] && currentFiltersActivitati['an'] != 'TOATE') {
        payload['an'] = currentFiltersActivitati['an'].replace("_", " ");
    }
    if(currentFiltersActivitati['locatie'] && currentFiltersActivitati['locatie'] != 'TOATE') {
        payload['locatie'] = currentFiltersActivitati['locatie'].replace("_", " ");
    }
    $.ajax({
        url: "/api/statistics/activitati_generate_csv",
        type: "POST",
        data: JSON.stringify(payload),
        success: function(data) { 
            window.location.href = data;
            $('#statisticsActivitatiDownloadCSVButton').prop('disabled', false);
        },
        error: function(e) {
            alert("Eroare la generarea fisierului");
            $('#statisticsActivitatiDownloadCSVButton').prop('disabled', false);
        }
    });   
}
function downloadCampaniiCSV() {
    $('#statisticsCampaniiDownloadCSVButton').prop('disabled', true);
    let payload = {};
    if(currentFiltersCampanii['an'] && currentFiltersCampanii['an'] != 'TOATE') {
        payload['an'] = currentFiltersCampanii['an'].replace("_", " ");
    }
    if(currentFiltersCampanii['nume'] && currentFiltersCampanii['nume'] != 'TOATE') {
        payload['nume'] = currentFiltersCampanii['nume'].replace("_", " ");
    }
    $.ajax({
        url: "/api/statistics/campanii_generate_csv",
        type: "POST",
        data: JSON.stringify(payload),
        success: function(data) { 
            window.location.href = data;
            $('#statisticsCampaniiDownloadCSVButton').prop('disabled', false);
        },
        error: function(e) {
            alert("Eroare la generarea fisierului");
            $('#statisticsCampaniiDownloadCSVButton').prop('disabled', false);
        }
    });   
}
function downloadUrgenteCSV() {
    $('#statisticsUrgenteDownloadCSVButton').prop('disabled', true);
    let payload = {};
    if(currentFiltersUrgente['an'] && currentFiltersUrgente['an'] != 'TOATE') {
        payload['an'] = currentFiltersUrgente['an'].replace("_", " ");
    }
    if(currentFiltersUrgente['urgenta'] && currentFiltersUrgente['urgenta'] != 'TOATE') {
        payload['urgenta'] = currentFiltersUrgente['urgenta'].replace("_", " ");
    }
    $.ajax({
        url: "/api/statistics/urgente_generate_csv",
        type: "POST",
        data: JSON.stringify(payload),
        success: function(data) { 
            window.location.href = data;
            $('#statisticsUrgenteDownloadCSVButton').prop('disabled', false);
        },
        error: function(e) {
            alert("Eroare la generarea fisierului");
            $('#statisticsUrgenteDownloadCSVButton').prop('disabled', false);
        }
    });   
}
function downloadUrgente_drogCSV() {
    $('#statisticsUrgente_drogDownloadCSVButton').prop('disabled', true);
    let payload = {};
    if(currentFiltersUrgente_drog['an'] && currentFiltersUrgente_drog['an'] != 'TOATE') {
        payload['an'] = currentFiltersUrgente_drog['an'].replace("_", " ");
    }
    if(currentFiltersUrgente_drog['drog'] && currentFiltersUrgente_drog['drog'] != 'TOATE') {
        payload['drog'] = currentFiltersUrgente_drog['drog'].replace("_", " ");
    }
    $.ajax({
        url: "/api/statistics/urgente__drog_generate_csv",
        type: "POST",
        data: JSON.stringify(payload),
        success: function(data) { 
            window.location.href = data;
            $('#statisticsUrgente_drogDownloadCSVButton').prop('disabled', false);
        },
        error: function(e) {
            alert("Eroare la generarea fisierului");
            $('#statisticsUrgente_drogDownloadCSVButton').prop('disabled', false);
        }
    });   
}

function downloadAsPng(canvas) {
    let canvasUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = canvasUrl;
    link.download = "chart.png"; // Numele fișierului de descărcat
    link.click();
    link.remove();
  }
