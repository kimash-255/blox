export const fields = [
  {
    "type": "tab",
    "sections": [
      {
        "id": "section_1",
        "name": "Section 1",
        "type": "section",
        "columns": [
          {
            "id": "column_1",
            "name": "Column 1",
            "type": "column",
            "fields": [
              {
                "id": "datefield_1",
                "name": "DateField 1",
                "icon": {
                  "prefix": "fas",
                  "iconName": "calendar-days",
                  "icon": [
                    448,
                    512,
                    [
                      "calendar-alt"
                    ],
                    "f073",
                    "M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"
                  ]
                },
                "id1": "datefield",
                "type": "DateField",
                "search": true,
                "filter": true,
                "list": true
              }
            ],
            "id1": "column_1",
            "columns": [],
            "sections": []
          },
          {
            "id": "column_2",
            "name": "Column 2",
            "type": "column",
            "fields": [
              {
                "id": "charfield_1",
                "name": "CharField 1",
                "icon": {
                  "prefix": "fas",
                  "iconName": "font",
                  "icon": [
                    448,
                    512,
                    [],
                    "f031",
                    "M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416 32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-1.8 0 18-48 159.6 0 18 48-1.8 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-25.8 0L254 52.8zM279.8 304l-111.6 0L224 155.1 279.8 304z"
                  ]
                },
                "id1": "charfield_1",
                "type": "CharField",
                "list": true,
                "filter": true,
                "search": true
              }
            ],
            "id1": "column_2",
            "columns": [],
            "sections": []
          }
        ],
        "id1": "section_1",
        "sections": [],
        "fields": []
      },
      {
        "id": "section_2",
        "name": "Section 2",
        "type": "section",
        "columns": [
          {
            "id": "column_1",
            "name": "Column 1",
            "type": "column",
            "fields": [
              {
                "id": "decimalfield_1",
                "name": "DecimalField 1",
                "icon": {
                  "prefix": "fas",
                  "iconName": "hashtag",
                  "icon": [
                    448,
                    512,
                    [
                      62098
                    ],
                    "23",
                    "M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z"
                  ]
                },
                "id1": "decimalfield_1",
                "type": "DecimalField",
                "list": true,
                "filter": true,
                "search": true
              }
            ],
            "id1": "column_1",
            "columns": [],
            "sections": []
          }
        ],
        "id1": "section_2",
        "sections": [],
        "fields": []
      }
    ],
    "id": "details",
    "id1": "details",
    "name": "Details"
  }
];
