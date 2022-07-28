/** 获取嵌套数据 */
export function getNestingValue(element, data) {
    // 属性名称
    let props = element.prop.split("_");
    // 最终值
    var value = data;
    // 遍历属性
    for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        // 属性值
        value = value[prop];
        // 当该 值 为 数组
        if (value && Array.isArray(value)) {
            // 数组格式化
            var arrayFormat = "";
            // 遍历数组
            for (let j = 0; j < value.length; j++) {
                // 数组 项
                const item = value[j];
                if (props.length == i + 1) {
                    arrayFormat += item + ",";
                } else {
                    // 数组 项 值
                    var itemValue;
                    // 遍历数组对象 属性
                    for (let k = i + 1; k < props.length; k++) {
                        let arrayItemProp = props[k];
                        itemValue = item[arrayItemProp];
                    }
                    arrayFormat += itemValue + ", ";
                }
            }
            value =
                arrayFormat.length >= 2 ?
                arrayFormat.substring(0, arrayFormat.length - 2) :
                "--";
            break;
        }
    }
    return value;
}