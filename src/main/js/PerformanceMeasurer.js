window.de = window.de || {};
window.de.bennyn = window.de.bennyn || {};
window.de.bennyn.tracking = window.de.bennyn.tracking || {};

window.de.bennyn.tracking.PerformanceMeasurer = (function () {
  var median = function (sequence) {
    sequence.sort();
    return sequence[Math.ceil(sequence.length / 2)];
  };

  var iterations = 10;

  var measurement = undefined;

  return {
    setIterations: function (value) {
      iterations = value;
    },
    getMeasurement: function () {
      return measurement;
    },
    measure: function (testCandidate) {
      var measurements = [];
      var returnValue = undefined;

      if (typeof testCandidate === 'function') {
        for (var i = 0; i < iterations; i++) {
          var start = (window.performance || window.Date).now();
          returnValue = testCandidate();
          var stop = (window.performance || window.Date).now();
          measurements.push(stop - start);
        }

        measurement = window.parseFloat(median(measurements).toFixed(4));
        return returnValue;
      } else {
        var error = new Error('You have to provide a function to be measured.');
        console.error(error);
        return error;
      }
    },
    measureWithPromises: function () {
      // TODO
    }
  };
})();