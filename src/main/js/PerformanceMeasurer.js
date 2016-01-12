window.de = window.de || {};
window.de.bennyn = window.de.bennyn || {};
window.de.bennyn.tracking = window.de.bennyn.tracking || {};

window.de.bennyn.tracking.PerformanceMeasurer = (function () {
  var median = function (sequence) {
    sequence.sort();
    return sequence[Math.ceil(sequence.length / 2)];
  };

  var iterations = 10;

  return {
    setIterations: function (value) {
      iterations = value;
    },
    measure: function (testCandidate) {
      var measurements = [];

      if (typeof testCandidate === 'function') {
        for (var i = 0; i < iterations; i++) {
          var start = (window.performance || window.Date).now();
          testCandidate();
          var stop = (window.performance || window.Date).now();
          measurements.push(stop - start);
        }
        return window.parseFloat(median(measurements).toFixed(4));
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