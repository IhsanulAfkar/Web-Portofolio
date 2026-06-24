export const SOCKET_EMIT_TYPES: string[] = [
  'social_media',
  'news',
  'topic_modeling',
  'sentiment',
  'hate_speech',
  'spam',
  'comment',
];

export const SOCKET_TYPE_LABEL: Record<string, string> = {
  social_media: 'Raw Timeline',
  news: 'Raw Timeline',
  topic_modeling: 'Topic Modeling',
  sentiment: 'Sentiment Analysis',
  hate_speech: 'Hate Speech',
  spam: 'Spam Detection',
  comment: 'Comments',
};
export const SOCKET_PROCESS_TYPE: string[] = ['link', 'comment'];


export const dummyDirjen = [
  'Pengelolaan Kelautan dan Ruang Laut (DJPRL)',
  'Perikanan Tangkap (DJPK)',
  'Perikanan Budidaya (DJPB)',
  'Penguatan Daya Saing Produk Kelautan dan Perikanan (PDSPKP)',
  'Pengawasan Sumber Daya Kelautan dan Perikanan (PSDKP)',
]

export const DIRJEN_TOPICS: Record<string, string> = {
  'Budi Daya Ikan Nila Salin (BINS)': "Perikanan Budi Daya",
  'Ekstensifikasi dan Intensifikasi Tambak Garam': "Pengelolaan Kelautan",
  'Kampung Nelayan Merah Putih (KNMP)': "Perikanan Tangkap",
  'INTEGRATED OF FISHING PORTS AND INTERNATIONAL FISH MARKET PHASE i': "Perikanan Tangkap",
  'Revitalisasi Prasarana dan Sarana Pendidikan KP di 11 Lokasi': "-",
  'Revitalisasi Tambak Pantura': "-",
  'Integrated of Fishing Ports and International Fish Markets Phase I': "Perikanan Tangkap",
  'PENATAAN RUANG LAUT': 'Perikanan Tangkap',
  'PAGAR BETON LAUT CILINCING': 'Perikanan Tangkap',
  'benih bening lobster': 'Perikanan Budidaya',
  'Sampah Laut': 'Pengelolaan Ruang Laut',
  'penjualan pulau ilegal': 'Pengawasan Sumber Daya Kelautan dan Perikanan',
}

export const REFETCH_INTERVAL = 60 * 5 * 1000
export const sentimentOptions = [
  { value: 'Positive', label: 'Positif' },
  { value: 'Negative', label: 'Negatif' },
  { value: 'Neutral', label: 'Netral' },
];

export const COUNTDOWN_FROM: string = "2026-12-12T00:00:00+07:00";

export const ROLE = {
  SUPERADMIN: 1,
  ADMIN: 2,
  PUBLISHER: 3,
  USER_ADMIN: 4,
}

export const SNA_COLOR: Record<string, string> = {
  tiktok: '#00F2EA',
  instagram: '#DA4088',
  twitter: '#BEBEBE',
  x: '#BEBEBE',
  facebook: '#69ABFF',
  threads: '#A88AFE',
  // search_engine: '#F4B400',
}
export const SNA_COLOR_DARKEN: Record<string, string> = {
  tiktok: '#008F8A',
  instagram: '#7A204C',
  twitter: '#6E6E6E',
  facebook: '#2457A6',
  threads: '#5E4DA8',
}
export const chartSentimentConfig = {
  positif: {
    label: 'Positif',
    color: '#3DD598', // Green
  },
  negatif: {
    label: 'Negatif',
    color: '#FF6B6B', // Red
  },
  netral: {
    label: 'Netral',
    color: '#FFD93D', // Yellow
  },
};
export const SENTIMENT_COLOR: Record<string, string> = {
  positive: '#1AFFAF',
  negative: '#FF0004',
  neutral: '#FFD63B',
}
export const SENTIMENT_COLOR_EDGE: Record<string, string> = {
  positive: '#157A59',
  negative: '#8F2F31',
  neutral: '#8C7720',
}
export const MIN_VALUE = 3
export const MAX_VALUE = 20
export const MAIN_NODE_VALUE = 5
export const mapSocialMedia = (input: string): string => {
  const i = input.toLowerCase()
  if (i === 'twitter') return 'X'
  if (i === 'twitter_comment') return 'X Comment'
  if (i === 'tiktok_comment') return 'Tiktok Comment'
  if (i === 'search_engine') return 'Search Engine'
  return i
}
export const MAP_SENTIMENT_INDO: Record<string, string> = {
  positive: "positif",
  negative: "negatif",
  neutral: "netral",
}

export const SOCINET_EXCLUDED_PLATFORMS = ['search_engine']

export const SORT_BY_OPTIONS = [
  {
    label: 'Terbaru',
    value: 'created_at'
  },
  {
    label: 'Reach Tertinggi',
    value: 'reach'
  },
  {
    label: 'Engagement Tertinggi',
    value: 'engagement'
  },
]

export const topicMonitoring = [
  {
    "id": 566,
    "uuid": "72af5fb2-0385-40a1-ade5-7579b3c2c85e",
    "name": "KKP",
    "total_reach": 52821460,
    "total_engagement": 1982665,
    "popular_source": {
      "name": "TIKTOK",
      "count": 2320,
      "total_reach": 52484599,
      "total_engagement": 1925746
    },
    "platform_stats": [
      {
        "source": "FACEBOOK",
        "reach": 48380,
        "engagement": 48380
      },
      {
        "source": "TWITTER",
        "reach": 226088,
        "engagement": 6715
      },
      {
        "source": "INSTAGRAM",
        "reach": 62378,
        "engagement": 1752
      },
      {
        "source": "TIKTOK",
        "reach": 52484599,
        "engagement": 1925746
      },
      {
        "source": "THREADS",
        "reach": 15,
        "engagement": 72
      }
    ]
  },
  {
    "id": 568,
    "uuid": "d72c2f5d-3d6b-4271-b9a6-54d4bd5ea492",
    "name": "MENKP",
    "total_reach": 5679858,
    "total_engagement": 545766,
    "popular_source": {
      "name": "TIKTOK",
      "count": 452,
      "total_reach": 5384099,
      "total_engagement": 506247
    },
    "platform_stats": [
      {
        "source": "FACEBOOK",
        "reach": 38513,
        "engagement": 38513
      },
      {
        "source": "TWITTER",
        "reach": 248902,
        "engagement": 726
      },
      {
        "source": "INSTAGRAM",
        "reach": 8344,
        "engagement": 280
      },
      {
        "source": "TIKTOK",
        "reach": 5384099,
        "engagement": 506247
      },
      {
        "source": "THREADS",
        "reach": 0,
        "engagement": 0
      }
    ]
  },
  {
    "id": 569,
    "uuid": "33a6c888-9392-4cc4-ab41-cb0926fe44de",
    "name": "WAMENKP",
    "total_reach": 3263901,
    "total_engagement": 122258,
    "popular_source": {
      "name": "TIKTOK",
      "count": 175,
      "total_reach": 3262884,
      "total_engagement": 121693
    },
    "platform_stats": [
      {
        "source": "FACEBOOK",
        "reach": 555,
        "engagement": 555
      },
      {
        "source": "TWITTER",
        "reach": 462,
        "engagement": 10
      },
      {
        "source": "INSTAGRAM",
        "reach": 0,
        "engagement": 0
      },
      {
        "source": "TIKTOK",
        "reach": 3262884,
        "engagement": 121693
      },
      {
        "source": "THREADS",
        "reach": 0,
        "engagement": 0
      }
    ]
  }
]