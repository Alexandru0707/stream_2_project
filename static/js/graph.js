queue()
    .defer(d3.json,"/ArtDATA/projects" )
    .await(makeGraphs);

function makeGraphs(error, ArtDATAProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Clean ArtDATAProjects data

    ArtDATAProjects.forEach(function (d) {
        d["date"] = d["date"];
        d["type"] = d["type"];
        d["nr"] = +d["nr"];
        d["tech"] = d["tech"];
        d["draw_on"] = d["draw_on"];

    });

    console.log(ArtDATAProjects);

    //Create a Crossfilter instance

    var ndx = crossfilter(ArtDATAProjects);

    //Define Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["date"].slice(0,4);
    });

    var typeDim = ndx.dimension(function (d) {
        return d["type"];
    });

    var techDim = ndx.dimension(function (d) {
        return d["tech"];
    });

    var titleDim = ndx.dimension(function (d) {
        return d["title"];
    });

    var draw_on_dim = ndx.dimension(function(d){
        return d["draw_on"];
    });


    //Calculate metrics
    var all = ndx.groupAll();
    var ProjectsByDate = dateDim.group();
    var numProjectsByType = typeDim.group().reduceSum(function(d) {
        return d["nr"];
    });
    var numProjectsByTech = techDim.group();
    var numTotalDraws = ndx.groupAll().reduceSum(function (d) {
        return d["nr"];
    });
    var TitleSelector = titleDim.group();
    var drawOn = draw_on_dim.group();



    //Table
    var selectFieldState = dc.selectMenu("#menu-select-equipment");
    var selectYear = dc.selectMenu("#menu-select-year");
    var selectFieldResource = dc.selectMenu("#menu-select-base");
    var tableData = dc.dataTable("#table_data");

    //Charts
    var selectField = dc.selectMenu('#menu-select');
    var totalDraws = dc.numberDisplay("#total");
    var pieChart = dc.pieChart("#pie_chart");
    var rowChart_2 = dc.rowChart("#row_chart2");
    var BarChart = dc.barChart("#bar_chart");
    var rowChart = dc.rowChart("#row_chart");



    selectFieldState
        .dimension(techDim)
        .group(numProjectsByTech);

    selectFieldResource
        .dimension(draw_on_dim)
        .group(drawOn);

    selectYear
        .dimension(dateDim)
        .group(ProjectsByDate);

    tableData
        .width(650)
        .height(800)
        .dimension(dateDim)
        .group(function(d) {return d["date"].slice(0,4) })
        .size(Infinity)
        .columns([
            function(d) {return d["date"];},
            function(d) {return d["title"];},
            function(d) {return d["type"];},
            function(d) {return d["tech"];},
            function(d) {return d["draw_on"];}
 ])
        .sortBy(d3.descending );

    pieChart
        .width(300)
        .height(250)
        .ordinalColors(['#FB4248','#CA3B67','#2B3D4F','#6CBBDA','#ff7f00'])
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(dateDim)
        .group(ProjectsByDate);

    BarChart
        .width(600)
        .height(300)
        .margins({top: 25, right: 0, bottom: 25, left: 60})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(true)
        .ordinalColors(['#FB4248','#CA3B67','#2B3D4F','#6CBBDA','#ff7f00'])

        .yAxisLabel("Number")
        .dimension(typeDim)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(numProjectsByType);


    rowChart
        .ordinalColors(['#FB4248','#CA3B67','#2B3D4F','#6CBBDA','#ff7f00'])
        .width(300)
        .height(250)
        .dimension(techDim)
        .group(numProjectsByTech)
        .xAxis().ticks(4);

    rowChart_2
        .ordinalColors(['#FB4248','#CA3B67','#2B3D4F','#6CBBDA','#ff7f00'])
        .width(300)
        .height(250)
        .dimension(draw_on_dim)
        .group(drawOn)
        .xAxis().ticks(4);

    totalDraws
        .formatNumber(d3.format())
        .valueAccessor(function (d) {
            return d;
        })
        .group(numTotalDraws)
        .formatNumber(d3.format());
     // Records counter
    /* This counter shows the amount of records selected after applying a filter. */
    dc.dataCount('.dc-data-count')
        .dimension(ndx)
        .group(all)
        .html({
        some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records',
        all: 'All records selected.'});

    selectField
        .dimension(titleDim)
        .group(TitleSelector);

    dc.renderAll();
}

