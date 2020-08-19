const Benchmark = require('benchmark')
const { SimpleConsoleLogger } = require('typeorm/logger/SimpleConsoleLogger')
const { AdvancedConsoleLogger } = require('typeorm/logger/AdvancedConsoleLogger')

const simpleLogger = new SimpleConsoleLogger('warn')
const advanceLogger = new AdvancedConsoleLogger('warn')

const suite = new Benchmark.Suite

const query = `SELECT "Output"."outPointTxHash" AS "Output_outPointTxHash", "Output"."outPointIndex" AS "Output_outPointIndex", "Output"."capacity" AS "Output_capacity", "Output"."lockCodeHash" AS "Output_lockCodeHash", "Output"."lockArgs" AS "Output_lockArgs", "Output"."lockHashType" AS "Output_lockHashType", "Output"."lockHash" AS "Output_lockHash", "Output"."status" AS "Output_status", "Output"."typeCodeHash" AS "Output_typeCodeHash", "Output"."typeArgs" AS "Output_typeArgs", "Output"."typeHashType" AS "Output_typeHashType", "Output"."typeHash" AS "Output_typeHash", "Output"."data" AS "Output_data", "Output"."daoData" AS "Output_daoData", "Output"."hasData" AS "Output_hasData", "Output"."depositTxHash" AS "Output_depositTxHash", "Output"."depositIndex" AS "Output_depositIndex", "Output"."multiSignBlake160" AS "Output_multiSignBlake160", "Output"."transactionHash" AS "Output_transactionHash" FROM "output" "Output" WHERE "Output"."outPointTxHash" = ? AND "Output"."outPointIndex" = ? LIMIT 1`

const results = []

suite
    .add('simpleLogger', () => {
        simpleLogger.logQuerySlow(10, query)
    })
    .add('advanceLogger', () => {
        advanceLogger.logQuerySlow(10, query)
    })
    .on('cycle', function(event) {
        results.push(String(event.target))
    })
    .on('complete', function() {
        console.log(results.join('\n'))
        console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    .run()
