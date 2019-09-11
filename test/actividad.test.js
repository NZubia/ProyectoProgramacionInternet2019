const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;
const mongoose = require('mongoose');

const ActivityModel = require("../models/actividad.model").ActivityModel;

//tell mongoose to use es6 implementation of promises
mongoose.Promise = Promise;

mongoose.connect('mongodb://127.0.0.1:27014/frac');

mongoose.connection
    .once('open', function(){
        console.log('Database connection was done!');
    })
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

// Called hooks which runs before something.
beforeEach((done) => {

    mongoose.connection.collections.activities.drop(() => {
        done(); //go ahead everything is done now.
    });
});

// beforeEach('El valor numérico no debe de ser flotante', (done) => {
//     let newActivity = new ActivityModel({
//         date: Date.now(),
//         state: "INICIADO",
//         capacity: 10
//     });
//
//     done(newActivity);
// });

describe('Actividad', function(){

    // Funcionalidad de modificar Actividad
    describe('Modificar Actividad', function(){

        describe('Modificar Fecha', function(){
        });

        describe.only('Modificar # Personas', function(newActivity){
            it('Si el valor es diferente a un número no debe de dejar modificar', function(){
                let newActivity = new ActivityModel({
                    date: Date.now(),
                    state: "INICIADO",
                    capacity: 10
                });

                assert.throws(newActivity.modificarCapacidad.bind(null, "Hola"));
                assert.throws(newActivity.modificarCapacidad.bind(null, null));
                assert.throws(newActivity.modificarCapacidad.bind(null, undefined));
                assert.throws(newActivity.modificarCapacidad.bind(null, []));
                assert.throws(newActivity.modificarCapacidad.bind(null, [1]));

            });
            it('El valor numérico no debe de ser flotante', function(){
                let newActivity = new ActivityModel({
                    date: Date.now(),
                    state: "INICIADO",
                    capacity: 10
                });

                assert.throws(newActivity.modificarCapacidad.bind(null, 5.5));
            });
            it('El valor numérico no debe de ser menor o igual a 0', function(){
                let newActivity = new ActivityModel({
                    date: Date.now(),
                    state: "INICIADO",
                    capacity: 10
                });

                assert.throws(newActivity.modificarCapacidad.bind(null, -1));
            });
            it('Recibo el valor correcto debe de cambiar', function(){
                let newActivity = new ActivityModel({
                    date: Date.now(),
                    state: "INICIADO",
                    capacity: 10
                });

                newActivity.modificarCapacidad(5);

                assert(newActivity.capacity === 5);
            });
        });

        describe('Modificar Estado', function(){
            it('Si no es la fecha del evento no puede ser terminado ni en progreso');
            it('El valor de estado no debe de ser diferente a los valores del enum');
            it('Si el evento ha sido terminado ya no se puede modificar');
        });
    });
});