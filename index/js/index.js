function fillin(content) {
    if (content) {
        $('#contactEnquiry').val(content);
        $('#contactModal').modal('show');
    } else {
        $('#contactEnquiry').val($('#contactContent').val());
    }
    return
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

$("#contactModal").on('hidden.bs.modal', function () {
    $(this).data('bs.modal', null);
});

$('#submission').on('click', function (e) {
    $('.loader').show();
    e.preventDefault();
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbyMn3TxeyHaq0TvSHEwfHJR06yHVxJpr1RwyulFumE5vbwevJY/exec',
        method: "GET",
        dataType: "json",
        data: $('#enquiryForm').serializeObject(),
        success: function (rooms) {
            $('#contactModal').modal('hide');
            $('#contactSuccess').show();
            $('.loader').hide();
        },
        error: function (rooms) {
            $('#contactModal').modal('hide');
            $('#contactError').show();
            $('.loader').hide();
        }
    });
});

if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/random/720x1280')";
} else {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1280x720')";
}