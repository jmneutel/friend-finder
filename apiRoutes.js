$("#add-btn").on("click", function(event) {
    event.preventDefault();
    var surveyAnswers = {
        name: $("#name").val().trim(),
        photo: $("#photo").val().trim(),
        scores: [

        $('select[name=q1]').val(),
        $('select[name=q2]').val(),
        $('select[name=q3]').val(),
        $('select[name=q4]').val(),
        $('select[name=q5]').val(),
        $('select[name=q6]').val(),
        $('select[name=q7]').val(),
        $('select[name=q8]').val(),
        $('select[name=q9]').val(),
        $('select[name=q10]').val()

        ]
    };

    // Question: What does this code do??
    $.post("/api/new", surveyAnswers)
        .done(function(data) {
            console.log(data);
            alert("Adding Information...");
        });
});