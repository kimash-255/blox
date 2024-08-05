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
                "id": "booleanfield_1",
                "name": "BooleanField 1",
                "icon": {
                  "prefix": "fas",
                  "iconName": "toggle-on",
                  "icon": [
                    576,
                    512,
                    [],
                    "f205",
                    "M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                  ]
                },
                "id1": "booleanfield_1",
                "type": "BooleanField"
              },
              {
                "id": "selectfield_1",
                "name": "SelectField 1",
                "icon": {
                  "prefix": "fas",
                  "iconName": "list",
                  "icon": [
                    512,
                    512,
                    [
                      "list-squares"
                    ],
                    "f03a",
                    "M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"
                  ]
                },
                "id1": "selectfield_1",
                "type": "SelectField",
                "list": true,
                "filter": true
              }
            ],
            "id1": "column_1",
            "columns": [],
            "sections": []
          }
        ],
        "id1": "section_1",
        "sections": [],
        "fields": []
      }
    ],
    "id": "details",
    "id1": "details",
    "name": "Details"
  },
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
                "id": "foreignkey_1",
                "name": "ForeignKey 1",
                "icon": {
                  "prefix": "fas",
                  "iconName": "key",
                  "icon": [
                    512,
                    512,
                    [
                      128273
                    ],
                    "f084",
                    "M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"
                  ]
                },
                "id1": "foreignkey_1",
                "type": "ForeignKey",
                "doc": "Cold",
                "filter": true,
                "list": true
              }
            ],
            "id1": "column_1",
            "columns": [],
            "sections": []
          }
        ],
        "id1": "section_1",
        "sections": [],
        "fields": []
      },
      {
        "id": "section_3",
        "name": "Section 3",
        "type": "section",
        "columns": [
          {
            "id": "column_1",
            "name": "Column 1",
            "type": "column",
            "fields": [
              {
                "id": "manytomanyfield_1",
                "name": "ManyToManyField 1",
                "icon": {
                  "prefix": "fas",
                  "iconName": "users",
                  "icon": [
                    640,
                    512,
                    [],
                    "f0c0",
                    "M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"
                  ]
                },
                "id1": "manytomanyfield_1",
                "type": "ManyToManyField",
                "doc": "Danci"
              }
            ],
            "id1": "column_1",
            "columns": [],
            "sections": []
          }
        ],
        "id1": "section_3",
        "sections": [],
        "fields": []
      }
    ],
    "id": "tab_1",
    "id1": "tab_1",
    "name": "Tab 1"
  }
];
