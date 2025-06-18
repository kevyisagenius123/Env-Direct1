/**
 * Mock data for interactive components in articles
 * This file provides sample data for testing and demonstration purposes
 */

// Sample chart data
export const chartData = {
  // Line chart showing temperature trends
  temperatureTrends: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: [26.2, 26.5, 27.1, 27.8, 28.3, 28.0, 27.5],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Historical Average (°C)',
        data: [25.8, 26.0, 26.5, 27.0, 27.5, 27.2, 26.8],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderDash: [5, 5],
        tension: 0.3,
      }
    ]
  },

  // Bar chart showing rainfall by region
  rainfallByRegion: {
    labels: ['Roseau', 'Portsmouth', 'Marigot', 'Castle Bruce', 'Grand Bay'],
    datasets: [
      {
        label: 'Annual Rainfall (mm)',
        data: [1850, 2100, 2300, 2500, 1950],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  },

  // Pie chart showing land use distribution
  landUseDistribution: {
    labels: ['Forest', 'Agriculture', 'Urban', 'Water', 'Other'],
    datasets: [
      {
        label: 'Land Use (%)',
        data: [60, 25, 8, 4, 3],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 206, 86)',
          'rgb(153, 102, 255)',
          'rgb(54, 162, 235)',
          'rgb(255, 159, 64)'
        ],
        borderWidth: 1
      }
    ]
  },

  // Doughnut chart showing energy sources
  energySources: {
    labels: ['Hydroelectric', 'Geothermal', 'Solar', 'Wind', 'Fossil Fuels'],
    datasets: [
      {
        label: 'Energy Sources (%)',
        data: [30, 15, 10, 5, 40],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }
    ]
  }
};

// Sample map markers
export const mapMarkers = {
  ecoTourismSites: [
    {
      lat: 15.3167,
      lng: -61.2833,
      title: 'Boiling Lake',
      description: 'One of the world\'s largest hot springs, located in Morne Trois Pitons National Park.'
    },
    {
      lat: 15.3167,
      lng: -61.3333,
      title: 'Trafalgar Falls',
      description: 'Twin waterfalls located in Morne Trois Pitons National Park.'
    },
    {
      lat: 15.3500,
      lng: -61.3667,
      title: 'Middleham Falls',
      description: 'A 200-foot waterfall in the rainforest of Morne Trois Pitons National Park.'
    },
    {
      lat: 15.4000,
      lng: -61.3000,
      title: 'Emerald Pool',
      description: 'A natural swimming pool with a waterfall, located in Morne Trois Pitons National Park.'
    }
  ],

  conservationAreas: [
    {
      lat: 15.3333,
      lng: -61.3333,
      title: 'Morne Trois Pitons National Park',
      description: 'UNESCO World Heritage Site featuring tropical forest, volcanoes, lakes, and waterfalls.'
    },
    {
      lat: 15.5833,
      lng: -61.4667,
      title: 'Cabrits National Park',
      description: 'A national park on a peninsula featuring tropical forest and coral reefs.'
    },
    {
      lat: 15.2500,
      lng: -61.3667,
      title: 'Soufrière-Scotts Head Marine Reserve',
      description: 'A marine reserve featuring coral reefs and underwater volcanic craters.'
    }
  ],

  climateMonitoringStations: [
    {
      lat: 15.3083,
      lng: -61.3875,
      title: 'Roseau Climate Station',
      description: 'Main climate monitoring station in the capital city.'
    },
    {
      lat: 15.5500,
      lng: -61.4667,
      title: 'Portsmouth Climate Station',
      description: 'Northern climate monitoring station.'
    },
    {
      lat: 15.2417,
      lng: -61.2667,
      title: 'La Plaine Climate Station',
      description: 'Eastern climate monitoring station.'
    }
  ]
};

// Sample GeoJSON data
export const geoJSONData = {
  watersheds: {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Roseau River Watershed",
          "description": "Major watershed in the southwest region.",
          "color": "#3388ff",
          "fillColor": "#3388ff",
          "weight": 2,
          "fillOpacity": 0.2
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-61.4000, 15.3500],
            [-61.3800, 15.3500],
            [-61.3800, 15.3300],
            [-61.4000, 15.3300],
            [-61.4000, 15.3500]
          ]]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Layou River Watershed",
          "description": "Largest watershed on the island.",
          "color": "#33cc33",
          "fillColor": "#33cc33",
          "weight": 2,
          "fillOpacity": 0.2
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-61.4200, 15.4000],
            [-61.3800, 15.4000],
            [-61.3800, 15.3700],
            [-61.4200, 15.3700],
            [-61.4200, 15.4000]
          ]]
        }
      }
    ]
  },

  protectedAreas: {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Morne Trois Pitons National Park",
          "description": "UNESCO World Heritage Site.",
          "color": "#ff7800",
          "fillColor": "#ff7800",
          "weight": 2,
          "fillOpacity": 0.2
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-61.3500, 15.3500],
            [-61.3000, 15.3500],
            [-61.3000, 15.3000],
            [-61.3500, 15.3000],
            [-61.3500, 15.3500]
          ]]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Cabrits National Park",
          "description": "Marine and terrestrial national park.",
          "color": "#9933ff",
          "fillColor": "#9933ff",
          "weight": 2,
          "fillOpacity": 0.2
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-61.4800, 15.5900],
            [-61.4700, 15.5900],
            [-61.4700, 15.5800],
            [-61.4800, 15.5800],
            [-61.4800, 15.5900]
          ]]
        }
      }
    ]
  }
};

// Sample article with interactive content
export const sampleArticleWithInteractiveContent = {
  title: "Climate Change Impacts on Dominica's Ecosystems",
  content: `
    <h2>Understanding Climate Change in Dominica</h2>
    <p>Climate change is having significant impacts on Dominica's ecosystems. This article explores the current and projected effects on the island's biodiversity, water resources, and coastal areas.</p>

    <h3>Temperature Trends</h3>
    <p>Average temperatures in Dominica have been rising steadily over the past decades, with notable acceleration in recent years.</p>

    {{CHART:type=line,title=Temperature Trends in Dominica,description=Average monthly temperatures compared to historical averages,data=temperatureTrends}}

    <h3>Rainfall Patterns</h3>
    <p>Rainfall patterns are changing across different regions of the island, with some areas experiencing increased precipitation while others face more frequent drought conditions.</p>

    {{CHART:type=bar,title=Annual Rainfall by Region,description=Comparison of annual rainfall across different regions of Dominica,data=rainfallByRegion}}

    <h3>Land Use Changes</h3>
    <p>Land use patterns in Dominica have evolved over time, with implications for ecosystem resilience and biodiversity conservation.</p>

    {{CHART:type=pie,title=Land Use Distribution in Dominica,description=Percentage breakdown of different land use categories,data=landUseDistribution}}

    <h3>Energy Transition</h3>
    <p>Dominica is working towards becoming the world's first climate-resilient nation, with a focus on renewable energy sources.</p>

    {{CHART:type=doughnut,title=Energy Sources in Dominica,description=Distribution of energy sources in the national grid,data=energySources}}

    <h2>Ecosystem Changes</h2>
    <p>Visual evidence of ecosystem changes can be observed across the island, particularly in coastal areas and forests affected by extreme weather events.</p>

    <h3>Forest Recovery After Hurricane Maria</h3>
    <p>The forests of Dominica have shown remarkable recovery following the devastation of Hurricane Maria in 2017.</p>

    {{IMAGE_COMPARE:before=https://source.unsplash.com/random/800x600/?hurricane+damage+forest,after=https://source.unsplash.com/random/800x600/?forest+recovery,title=Forest Recovery,description=Morne Trois Pitons National Park forest recovery from 2017 to 2023,beforeLabel=Post-Hurricane (2017),afterLabel=Recovery (2023)}}

    <h3>Coastal Erosion</h3>
    <p>Rising sea levels and increased storm intensity have accelerated coastal erosion in vulnerable areas.</p>

    {{IMAGE_COMPARE:before=https://source.unsplash.com/random/800x600/?coastline+2010,after=https://source.unsplash.com/random/800x600/?coastline+erosion,title=Coastal Erosion,description=Changes to the coastline near Roseau from 2010 to 2023,beforeLabel=2010,afterLabel=2023}}

    <h2>Conservation Efforts</h2>
    <p>Dominica has established several protected areas to conserve its unique biodiversity and ecosystem services.</p>

    <h3>Protected Areas</h3>
    <p>The map below shows key protected areas and conservation sites across the island.</p>

    {{MAP:center=15.4150|-61.3710,zoom=10,markers=conservationAreas,geoJSON=protectedAreas,title=Protected Areas in Dominica,description=Major conservation areas and national parks,height=500}}

    <h3>Eco-Tourism Sites</h3>
    <p>Eco-tourism plays a vital role in Dominica's economy and conservation efforts, providing incentives for preserving natural areas.</p>

    {{MAP:center=15.4150|-61.3710,zoom=10,markers=ecoTourismSites,title=Eco-Tourism Destinations,description=Popular eco-tourism sites across Dominica}}

    <h2>Climate Monitoring</h2>
    <p>A network of climate monitoring stations across the island helps track changes and inform adaptation strategies.</p>

    {{MAP:center=15.4150|-61.3710,zoom=10,markers=climateMonitoringStations,geoJSON=watersheds,title=Climate Monitoring Network,description=Climate monitoring stations and major watersheds}}

    <h2>Conclusion</h2>
    <p>Addressing climate change impacts requires coordinated efforts in conservation, sustainable development, and community engagement. Dominica's progress towards climate resilience offers valuable lessons for other small island developing states.</p>
  `,
  interactiveData: {
    // Chart data
    temperatureTrends: chartData.temperatureTrends,
    rainfallByRegion: chartData.rainfallByRegion,
    landUseDistribution: chartData.landUseDistribution,
    energySources: chartData.energySources,

    // Map markers
    ecoTourismSites: mapMarkers.ecoTourismSites,
    conservationAreas: mapMarkers.conservationAreas,
    climateMonitoringStations: mapMarkers.climateMonitoringStations,

    // GeoJSON data
    watersheds: geoJSONData.watersheds,
    protectedAreas: geoJSONData.protectedAreas
  }
};

export default {
  chartData,
  mapMarkers,
  geoJSONData,
  sampleArticleWithInteractiveContent
};
