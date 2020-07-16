document.addEventListener('DOMContentLoaded', () => {

    // Show Experimenter Ready button when fields are not empty
    hideButtons();
    $('#inputEnum').on('input', function() {
        handleEnum();
    });

    $('#inputPnum').on('input', function() {
        handleEnum();
    });

    $('#econsent').change(function () {
        handleEnum();
    });

    $('#pconsent').change(function () {
        handleEnum();
    });

    // Show Participant Ready button when Participant number is not empty
    $('#eready').click(function () {
        $('#pready').show();
    });

    // Logged in
    $('#pready').click(function () {
        
    });

    function hideButtons() {
        $('#eready').hide();
        $('#pready').hide();
    }

    function handleEnum() {
        // Show Experimenter Ready button when Experimenter number is not empty
        if (!$('#inputEnum').val() || !$('#econsent').is(':checked') || !$('#inputPnum').val() || !$('#pconsent').is(':checked') ) {
            $('#eready').hide();
        }
        else {
            $('#eready').show();
        }
    }
});