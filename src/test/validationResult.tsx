export const validationResult = {
  task_id: "a2500a5b-720f-4331-bea3-bd81127bf5a6",
  status: "validated",
  image_count: 1,
  results: [
    {
      image_index: 0,
      result: {
        Text_Category: {
          Copyright: {
            status: "ok",
            reason: {
              en: "No issues found.",
              jp: "問題は確認されませんでした。",
            },
          },
          Character_Name: {
            status: "ok",
            reason: {
              en: "No issues found.",
              jp: "問題は確認されませんでした。",
            },
          },
          Other_Texts: {
            status: "ok",
            reason: {
              en: "No issues found.",
              jp: "問題は確認されませんでした。",
            },
          },
          Dialogue: {
            status: "ok",
            reason: {
              en: "No issues found.",
              jp: "問題は確認されませんでした。",
            },
          },
        },
        Design_Category: {
          Character_Design: {
            status: "ok",
            https_url:
              "https://s3-kumamon.s3.ap-northeast-1.amazonaws.com/Kumamon2.png",
            reason: {
              en: "No issues found.",
              jp: "問題は確認されませんでした。",
            },
          },
          Logo_Design: {
            status: "ok",
            https_url: "",
            reason: {
              en: "No issues found.",
              jp: "問題は確認されませんでした。",
            },
          },
        },
        Brand_Philosophy_Category: {
          NG_Contents: {
            status: "ok",
            reason: {
              en: "No issues found.",
              jp: "問題は確認されませんでした。",
            },
          },
        },
        summary: {
          status: "ok",
          reason: {
            en: "No issues found.",
            jp: "問題は確認されませんでした。",
          },
        },
        "Agents Execution Summary": {
          brand_philosophy_time_seconds: 7.4005283000005875,
          text_verification_time_seconds: 10.819336800000201,
          design_validation_time_seconds: 9.231942999999774,
          output_formatting_time_seconds: 4.530293699999675,
          workflow_actual_time_seconds: 15.35995869999988,
        },
      },
    },
  ],
  next_step: "GET /pdf/a2500a5b-720f-4331-bea3-bd81127bf5a6 to generate PDF",
};
