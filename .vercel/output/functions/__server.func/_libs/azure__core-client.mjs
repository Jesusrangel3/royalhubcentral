import { r as requireTslib } from "./tslib.mjs";
import { r as requireCommonjs$1 } from "./azure__core-rest-pipeline.mjs";
import { r as requireCommonjs$2 } from "./azure__logger.mjs";
var commonjs = {};
var serializer = {};
var base64 = {};
var hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64) return base64;
  hasRequiredBase64 = 1;
  Object.defineProperty(base64, "__esModule", { value: true });
  base64.encodeString = encodeString;
  base64.encodeByteArray = encodeByteArray;
  base64.decodeString = decodeString;
  base64.decodeStringToString = decodeStringToString;
  function encodeString(value) {
    return Buffer.from(value).toString("base64");
  }
  function encodeByteArray(value) {
    const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer);
    return bufferValue.toString("base64");
  }
  function decodeString(value) {
    return Buffer.from(value, "base64");
  }
  function decodeStringToString(value) {
    return Buffer.from(value, "base64").toString();
  }
  return base64;
}
var interfaces = {};
var hasRequiredInterfaces;
function requireInterfaces() {
  if (hasRequiredInterfaces) return interfaces;
  hasRequiredInterfaces = 1;
  Object.defineProperty(interfaces, "__esModule", { value: true });
  interfaces.XML_CHARKEY = interfaces.XML_ATTRKEY = void 0;
  interfaces.XML_ATTRKEY = "$";
  interfaces.XML_CHARKEY = "_";
  return interfaces;
}
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.isPrimitiveBody = isPrimitiveBody;
  utils.isDuration = isDuration;
  utils.isValidUuid = isValidUuid;
  utils.flattenResponse = flattenResponse;
  function isPrimitiveBody(value, mapperTypeName) {
    return mapperTypeName !== "Composite" && mapperTypeName !== "Dictionary" && (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || mapperTypeName?.match(/^(Date|DateTime|DateTimeRfc1123|UnixTime|ByteArray|Base64Url)$/i) !== null || value === void 0 || value === null);
  }
  const validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function isDuration(value) {
    return validateISODuration.test(value);
  }
  const validUuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;
  function isValidUuid(uuid) {
    return validUuidRegex.test(uuid);
  }
  function handleNullableResponseAndWrappableBody(responseObject) {
    const combinedHeadersAndBody = {
      ...responseObject.headers,
      ...responseObject.body
    };
    if (responseObject.hasNullableType && Object.getOwnPropertyNames(combinedHeadersAndBody).length === 0) {
      return responseObject.shouldWrapBody ? { body: null } : null;
    } else {
      return responseObject.shouldWrapBody ? {
        ...responseObject.headers,
        body: responseObject.body
      } : combinedHeadersAndBody;
    }
  }
  function flattenResponse(fullResponse, responseSpec) {
    const parsedHeaders = fullResponse.parsedHeaders;
    if (fullResponse.request.method === "HEAD") {
      return {
        ...parsedHeaders,
        body: fullResponse.parsedBody
      };
    }
    const bodyMapper = responseSpec && responseSpec.bodyMapper;
    const isNullable = Boolean(bodyMapper?.nullable);
    const expectedBodyTypeName = bodyMapper?.type.name;
    if (expectedBodyTypeName === "Stream") {
      return {
        ...parsedHeaders,
        blobBody: fullResponse.blobBody,
        readableStreamBody: fullResponse.readableStreamBody
      };
    }
    const modelProperties = expectedBodyTypeName === "Composite" && bodyMapper.type.modelProperties || {};
    const isPageableResponse = Object.keys(modelProperties).some((k) => modelProperties[k].serializedName === "");
    if (expectedBodyTypeName === "Sequence" || isPageableResponse) {
      const arrayResponse = fullResponse.parsedBody ?? [];
      for (const key of Object.keys(modelProperties)) {
        if (modelProperties[key].serializedName) {
          arrayResponse[key] = fullResponse.parsedBody?.[key];
        }
      }
      if (parsedHeaders) {
        for (const key of Object.keys(parsedHeaders)) {
          arrayResponse[key] = parsedHeaders[key];
        }
      }
      return isNullable && !fullResponse.parsedBody && !parsedHeaders && Object.getOwnPropertyNames(modelProperties).length === 0 ? null : arrayResponse;
    }
    return handleNullableResponseAndWrappableBody({
      body: fullResponse.parsedBody,
      headers: parsedHeaders,
      hasNullableType: isNullable,
      shouldWrapBody: isPrimitiveBody(fullResponse.parsedBody, expectedBodyTypeName)
    });
  }
  return utils;
}
var hasRequiredSerializer;
function requireSerializer() {
  if (hasRequiredSerializer) return serializer;
  hasRequiredSerializer = 1;
  Object.defineProperty(serializer, "__esModule", { value: true });
  serializer.MapperTypeNames = void 0;
  serializer.createSerializer = createSerializer;
  const tslib_1 = /* @__PURE__ */ requireTslib();
  const base642 = tslib_1.__importStar(requireBase64());
  const interfaces_js_1 = requireInterfaces();
  const utils_js_1 = requireUtils();
  class SerializerImpl {
    modelMappers;
    isXML;
    constructor(modelMappers = {}, isXML = false) {
      this.modelMappers = modelMappers;
      this.isXML = isXML;
    }
    /**
     * @deprecated Removing the constraints validation on client side.
     */
    validateConstraints(mapper, value, objectName) {
      const failValidation = (constraintName, constraintValue) => {
        throw new Error(`"${objectName}" with value "${value}" should satisfy the constraint "${constraintName}": ${constraintValue}.`);
      };
      if (mapper.constraints && value !== void 0 && value !== null) {
        const { ExclusiveMaximum, ExclusiveMinimum, InclusiveMaximum, InclusiveMinimum, MaxItems, MaxLength, MinItems, MinLength, MultipleOf, Pattern, UniqueItems } = mapper.constraints;
        if (ExclusiveMaximum !== void 0 && value >= ExclusiveMaximum) {
          failValidation("ExclusiveMaximum", ExclusiveMaximum);
        }
        if (ExclusiveMinimum !== void 0 && value <= ExclusiveMinimum) {
          failValidation("ExclusiveMinimum", ExclusiveMinimum);
        }
        if (InclusiveMaximum !== void 0 && value > InclusiveMaximum) {
          failValidation("InclusiveMaximum", InclusiveMaximum);
        }
        if (InclusiveMinimum !== void 0 && value < InclusiveMinimum) {
          failValidation("InclusiveMinimum", InclusiveMinimum);
        }
        if (MaxItems !== void 0 && value.length > MaxItems) {
          failValidation("MaxItems", MaxItems);
        }
        if (MaxLength !== void 0 && value.length > MaxLength) {
          failValidation("MaxLength", MaxLength);
        }
        if (MinItems !== void 0 && value.length < MinItems) {
          failValidation("MinItems", MinItems);
        }
        if (MinLength !== void 0 && value.length < MinLength) {
          failValidation("MinLength", MinLength);
        }
        if (MultipleOf !== void 0 && value % MultipleOf !== 0) {
          failValidation("MultipleOf", MultipleOf);
        }
        if (Pattern) {
          const pattern = typeof Pattern === "string" ? new RegExp(Pattern) : Pattern;
          if (typeof value !== "string" || value.match(pattern) === null) {
            failValidation("Pattern", Pattern);
          }
        }
        if (UniqueItems && value.some((item, i, ar) => ar.indexOf(item) !== i)) {
          failValidation("UniqueItems", UniqueItems);
        }
      }
    }
    /**
     * Serialize the given object based on its metadata defined in the mapper
     *
     * @param mapper - The mapper which defines the metadata of the serializable object
     *
     * @param object - A valid Javascript object to be serialized
     *
     * @param objectName - Name of the serialized object
     *
     * @param options - additional options to serialization
     *
     * @returns A valid serialized Javascript object
     */
    serialize(mapper, object, objectName, options = { xml: {} }) {
      const updatedOptions = {
        xml: {
          rootName: options.xml.rootName ?? "",
          includeRoot: options.xml.includeRoot ?? false,
          xmlCharKey: options.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY
        }
      };
      let payload = {};
      const mapperType = mapper.type.name;
      if (!objectName) {
        objectName = mapper.serializedName;
      }
      if (mapperType.match(/^Sequence$/i) !== null) {
        payload = [];
      }
      if (mapper.isConstant) {
        object = mapper.defaultValue;
      }
      const { required, nullable } = mapper;
      if (required && nullable && object === void 0) {
        throw new Error(`${objectName} cannot be undefined.`);
      }
      if (required && !nullable && (object === void 0 || object === null)) {
        throw new Error(`${objectName} cannot be null or undefined.`);
      }
      if (!required && nullable === false && object === null) {
        throw new Error(`${objectName} cannot be null.`);
      }
      if (object === void 0 || object === null) {
        payload = object;
      } else {
        if (mapperType.match(/^any$/i) !== null) {
          payload = object;
        } else if (mapperType.match(/^(Number|String|Boolean|Object|Stream|Uuid)$/i) !== null) {
          payload = serializeBasicTypes(mapperType, objectName, object);
        } else if (mapperType.match(/^Enum$/i) !== null) {
          const enumMapper = mapper;
          payload = serializeEnumType(objectName, enumMapper.type.allowedValues, object);
        } else if (mapperType.match(/^(Date|DateTime|TimeSpan|DateTimeRfc1123|UnixTime)$/i) !== null) {
          payload = serializeDateTypes(mapperType, object, objectName);
        } else if (mapperType.match(/^ByteArray$/i) !== null) {
          payload = serializeByteArrayType(objectName, object);
        } else if (mapperType.match(/^Base64Url$/i) !== null) {
          payload = serializeBase64UrlType(objectName, object);
        } else if (mapperType.match(/^Sequence$/i) !== null) {
          payload = serializeSequenceType(this, mapper, object, objectName, Boolean(this.isXML), updatedOptions);
        } else if (mapperType.match(/^Dictionary$/i) !== null) {
          payload = serializeDictionaryType(this, mapper, object, objectName, Boolean(this.isXML), updatedOptions);
        } else if (mapperType.match(/^Composite$/i) !== null) {
          payload = serializeCompositeType(this, mapper, object, objectName, Boolean(this.isXML), updatedOptions);
        }
      }
      return payload;
    }
    /**
     * Deserialize the given object based on its metadata defined in the mapper
     *
     * @param mapper - The mapper which defines the metadata of the serializable object
     *
     * @param responseBody - A valid Javascript entity to be deserialized
     *
     * @param objectName - Name of the deserialized object
     *
     * @param options - Controls behavior of XML parser and builder.
     *
     * @returns A valid deserialized Javascript object
     */
    deserialize(mapper, responseBody, objectName, options = { xml: {} }) {
      const updatedOptions = {
        xml: {
          rootName: options.xml.rootName ?? "",
          includeRoot: options.xml.includeRoot ?? false,
          xmlCharKey: options.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY
        },
        ignoreUnknownProperties: options.ignoreUnknownProperties ?? false
      };
      if (responseBody === void 0 || responseBody === null) {
        if (this.isXML && mapper.type.name === "Sequence" && !mapper.xmlIsWrapped) {
          responseBody = [];
        }
        if (mapper.defaultValue !== void 0) {
          responseBody = mapper.defaultValue;
        }
        return responseBody;
      }
      let payload;
      const mapperType = mapper.type.name;
      if (!objectName) {
        objectName = mapper.serializedName;
      }
      if (mapperType.match(/^Composite$/i) !== null) {
        payload = deserializeCompositeType(this, mapper, responseBody, objectName, updatedOptions);
      } else {
        if (this.isXML) {
          const xmlCharKey = updatedOptions.xml.xmlCharKey;
          if (responseBody[interfaces_js_1.XML_ATTRKEY] !== void 0 && responseBody[xmlCharKey] !== void 0) {
            responseBody = responseBody[xmlCharKey];
          }
        }
        if (mapperType.match(/^Number$/i) !== null) {
          payload = parseFloat(responseBody);
          if (isNaN(payload)) {
            payload = responseBody;
          }
        } else if (mapperType.match(/^Boolean$/i) !== null) {
          if (responseBody === "true") {
            payload = true;
          } else if (responseBody === "false") {
            payload = false;
          } else {
            payload = responseBody;
          }
        } else if (mapperType.match(/^(String|Enum|Object|Stream|Uuid|TimeSpan|any)$/i) !== null) {
          payload = responseBody;
        } else if (mapperType.match(/^(Date|DateTime|DateTimeRfc1123)$/i) !== null) {
          payload = new Date(responseBody);
        } else if (mapperType.match(/^UnixTime$/i) !== null) {
          payload = unixTimeToDate(responseBody);
        } else if (mapperType.match(/^ByteArray$/i) !== null) {
          payload = base642.decodeString(responseBody);
        } else if (mapperType.match(/^Base64Url$/i) !== null) {
          payload = base64UrlToByteArray(responseBody);
        } else if (mapperType.match(/^Sequence$/i) !== null) {
          payload = deserializeSequenceType(this, mapper, responseBody, objectName, updatedOptions);
        } else if (mapperType.match(/^Dictionary$/i) !== null) {
          payload = deserializeDictionaryType(this, mapper, responseBody, objectName, updatedOptions);
        }
      }
      if (mapper.isConstant) {
        payload = mapper.defaultValue;
      }
      return payload;
    }
  }
  function createSerializer(modelMappers = {}, isXML = false) {
    return new SerializerImpl(modelMappers, isXML);
  }
  function trimEnd(str, ch) {
    let len = str.length;
    while (len - 1 >= 0 && str[len - 1] === ch) {
      --len;
    }
    return str.substr(0, len);
  }
  function bufferToBase64Url(buffer) {
    if (!buffer) {
      return void 0;
    }
    if (!(buffer instanceof Uint8Array)) {
      throw new Error(`Please provide an input of type Uint8Array for converting to Base64Url.`);
    }
    const str = base642.encodeByteArray(buffer);
    return trimEnd(str, "=").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function base64UrlToByteArray(str) {
    if (!str) {
      return void 0;
    }
    if (str && typeof str.valueOf() !== "string") {
      throw new Error("Please provide an input of type string for converting to Uint8Array");
    }
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    return base642.decodeString(str);
  }
  function splitSerializeName(prop) {
    const classes = [];
    let partialclass = "";
    if (prop) {
      const subwords = prop.split(".");
      for (const item of subwords) {
        if (item.charAt(item.length - 1) === "\\") {
          partialclass += item.substr(0, item.length - 1) + ".";
        } else {
          partialclass += item;
          classes.push(partialclass);
          partialclass = "";
        }
      }
    }
    return classes;
  }
  function dateToUnixTime(d) {
    if (!d) {
      return void 0;
    }
    if (typeof d.valueOf() === "string") {
      d = new Date(d);
    }
    return Math.floor(d.getTime() / 1e3);
  }
  function unixTimeToDate(n) {
    if (!n) {
      return void 0;
    }
    return new Date(n * 1e3);
  }
  function serializeBasicTypes(typeName, objectName, value) {
    if (value !== null && value !== void 0) {
      if (typeName.match(/^Number$/i) !== null) {
        if (typeof value !== "number") {
          throw new Error(`${objectName} with value ${value} must be of type number.`);
        }
      } else if (typeName.match(/^String$/i) !== null) {
        if (typeof value.valueOf() !== "string") {
          throw new Error(`${objectName} with value "${value}" must be of type string.`);
        }
      } else if (typeName.match(/^Uuid$/i) !== null) {
        if (!(typeof value.valueOf() === "string" && (0, utils_js_1.isValidUuid)(value))) {
          throw new Error(`${objectName} with value "${value}" must be of type string and a valid uuid.`);
        }
      } else if (typeName.match(/^Boolean$/i) !== null) {
        if (typeof value !== "boolean") {
          throw new Error(`${objectName} with value ${value} must be of type boolean.`);
        }
      } else if (typeName.match(/^Stream$/i) !== null) {
        const objectType = typeof value;
        if (objectType !== "string" && typeof value.pipe !== "function" && // NodeJS.ReadableStream
        typeof value.tee !== "function" && // browser ReadableStream
        !(value instanceof ArrayBuffer) && !ArrayBuffer.isView(value) && // File objects count as a type of Blob, so we want to use instanceof explicitly
        !((typeof Blob === "function" || typeof Blob === "object") && value instanceof Blob) && objectType !== "function") {
          throw new Error(`${objectName} must be a string, Blob, ArrayBuffer, ArrayBufferView, ReadableStream, or () => ReadableStream.`);
        }
      }
    }
    return value;
  }
  function serializeEnumType(objectName, allowedValues, value) {
    if (!allowedValues) {
      throw new Error(`Please provide a set of allowedValues to validate ${objectName} as an Enum Type.`);
    }
    const isPresent = allowedValues.some((item) => {
      if (typeof item.valueOf() === "string") {
        return item.toLowerCase() === value.toLowerCase();
      }
      return item === value;
    });
    if (!isPresent) {
      throw new Error(`${value} is not a valid value for ${objectName}. The valid values are: ${JSON.stringify(allowedValues)}.`);
    }
    return value;
  }
  function serializeByteArrayType(objectName, value) {
    if (value !== void 0 && value !== null) {
      if (!(value instanceof Uint8Array)) {
        throw new Error(`${objectName} must be of type Uint8Array.`);
      }
      value = base642.encodeByteArray(value);
    }
    return value;
  }
  function serializeBase64UrlType(objectName, value) {
    if (value !== void 0 && value !== null) {
      if (!(value instanceof Uint8Array)) {
        throw new Error(`${objectName} must be of type Uint8Array.`);
      }
      value = bufferToBase64Url(value);
    }
    return value;
  }
  function serializeDateTypes(typeName, value, objectName) {
    if (value !== void 0 && value !== null) {
      if (typeName.match(/^Date$/i) !== null) {
        if (!(value instanceof Date || typeof value.valueOf() === "string" && !isNaN(Date.parse(value)))) {
          throw new Error(`${objectName} must be an instanceof Date or a string in ISO8601 format.`);
        }
        value = value instanceof Date ? value.toISOString().substring(0, 10) : new Date(value).toISOString().substring(0, 10);
      } else if (typeName.match(/^DateTime$/i) !== null) {
        if (!(value instanceof Date || typeof value.valueOf() === "string" && !isNaN(Date.parse(value)))) {
          throw new Error(`${objectName} must be an instanceof Date or a string in ISO8601 format.`);
        }
        value = value instanceof Date ? value.toISOString() : new Date(value).toISOString();
      } else if (typeName.match(/^DateTimeRfc1123$/i) !== null) {
        if (!(value instanceof Date || typeof value.valueOf() === "string" && !isNaN(Date.parse(value)))) {
          throw new Error(`${objectName} must be an instanceof Date or a string in RFC-1123 format.`);
        }
        value = value instanceof Date ? value.toUTCString() : new Date(value).toUTCString();
      } else if (typeName.match(/^UnixTime$/i) !== null) {
        if (!(value instanceof Date || typeof value.valueOf() === "string" && !isNaN(Date.parse(value)))) {
          throw new Error(`${objectName} must be an instanceof Date or a string in RFC-1123/ISO8601 format for it to be serialized in UnixTime/Epoch format.`);
        }
        value = dateToUnixTime(value);
      } else if (typeName.match(/^TimeSpan$/i) !== null) {
        if (!(0, utils_js_1.isDuration)(value)) {
          throw new Error(`${objectName} must be a string in ISO 8601 format. Instead was "${value}".`);
        }
      }
    }
    return value;
  }
  function serializeSequenceType(serializer2, mapper, object, objectName, isXml, options) {
    if (!Array.isArray(object)) {
      throw new Error(`${objectName} must be of type Array.`);
    }
    let elementType = mapper.type.element;
    if (!elementType || typeof elementType !== "object") {
      throw new Error(`element" metadata for an Array must be defined in the mapper and it must of type "object" in ${objectName}.`);
    }
    if (elementType.type.name === "Composite" && elementType.type.className) {
      elementType = serializer2.modelMappers[elementType.type.className] ?? elementType;
    }
    const tempArray = [];
    for (let i = 0; i < object.length; i++) {
      const serializedValue = serializer2.serialize(elementType, object[i], objectName, options);
      if (isXml && elementType.xmlNamespace) {
        const xmlnsKey = elementType.xmlNamespacePrefix ? `xmlns:${elementType.xmlNamespacePrefix}` : "xmlns";
        if (elementType.type.name === "Composite") {
          tempArray[i] = { ...serializedValue };
          tempArray[i][interfaces_js_1.XML_ATTRKEY] = { [xmlnsKey]: elementType.xmlNamespace };
        } else {
          tempArray[i] = {};
          tempArray[i][options.xml.xmlCharKey] = serializedValue;
          tempArray[i][interfaces_js_1.XML_ATTRKEY] = { [xmlnsKey]: elementType.xmlNamespace };
        }
      } else {
        tempArray[i] = serializedValue;
      }
    }
    return tempArray;
  }
  function serializeDictionaryType(serializer2, mapper, object, objectName, isXml, options) {
    if (typeof object !== "object") {
      throw new Error(`${objectName} must be of type object.`);
    }
    const valueType = mapper.type.value;
    if (!valueType || typeof valueType !== "object") {
      throw new Error(`"value" metadata for a Dictionary must be defined in the mapper and it must of type "object" in ${objectName}.`);
    }
    const tempDictionary = {};
    for (const key of Object.keys(object)) {
      const serializedValue = serializer2.serialize(valueType, object[key], objectName, options);
      tempDictionary[key] = getXmlObjectValue(valueType, serializedValue, isXml, options);
    }
    if (isXml && mapper.xmlNamespace) {
      const xmlnsKey = mapper.xmlNamespacePrefix ? `xmlns:${mapper.xmlNamespacePrefix}` : "xmlns";
      const result = tempDictionary;
      result[interfaces_js_1.XML_ATTRKEY] = { [xmlnsKey]: mapper.xmlNamespace };
      return result;
    }
    return tempDictionary;
  }
  function resolveAdditionalProperties(serializer2, mapper, objectName) {
    const additionalProperties = mapper.type.additionalProperties;
    if (!additionalProperties && mapper.type.className) {
      const modelMapper = resolveReferencedMapper(serializer2, mapper, objectName);
      return modelMapper?.type.additionalProperties;
    }
    return additionalProperties;
  }
  function resolveReferencedMapper(serializer2, mapper, objectName) {
    const className = mapper.type.className;
    if (!className) {
      throw new Error(`Class name for model "${objectName}" is not provided in the mapper "${JSON.stringify(mapper, void 0, 2)}".`);
    }
    return serializer2.modelMappers[className];
  }
  function resolveModelProperties(serializer2, mapper, objectName) {
    let modelProps = mapper.type.modelProperties;
    if (!modelProps) {
      const modelMapper = resolveReferencedMapper(serializer2, mapper, objectName);
      if (!modelMapper) {
        throw new Error(`mapper() cannot be null or undefined for model "${mapper.type.className}".`);
      }
      modelProps = modelMapper?.type.modelProperties;
      if (!modelProps) {
        throw new Error(`modelProperties cannot be null or undefined in the mapper "${JSON.stringify(modelMapper)}" of type "${mapper.type.className}" for object "${objectName}".`);
      }
    }
    return modelProps;
  }
  function serializeCompositeType(serializer2, mapper, object, objectName, isXml, options) {
    if (getPolymorphicDiscriminatorRecursively(serializer2, mapper)) {
      mapper = getPolymorphicMapper(serializer2, mapper, object, "clientName");
    }
    if (object !== void 0 && object !== null) {
      const payload = {};
      const modelProps = resolveModelProperties(serializer2, mapper, objectName);
      for (const key of Object.keys(modelProps)) {
        const propertyMapper = modelProps[key];
        if (propertyMapper.readOnly) {
          continue;
        }
        let propName;
        let parentObject = payload;
        if (serializer2.isXML) {
          if (propertyMapper.xmlIsWrapped) {
            propName = propertyMapper.xmlName;
          } else {
            propName = propertyMapper.xmlElementName || propertyMapper.xmlName;
          }
        } else {
          const paths = splitSerializeName(propertyMapper.serializedName);
          propName = paths.pop();
          for (const pathName of paths) {
            const childObject = parentObject[pathName];
            if ((childObject === void 0 || childObject === null) && (object[key] !== void 0 && object[key] !== null || propertyMapper.defaultValue !== void 0)) {
              parentObject[pathName] = {};
            }
            parentObject = parentObject[pathName];
          }
        }
        if (parentObject !== void 0 && parentObject !== null) {
          if (isXml && mapper.xmlNamespace) {
            const xmlnsKey = mapper.xmlNamespacePrefix ? `xmlns:${mapper.xmlNamespacePrefix}` : "xmlns";
            parentObject[interfaces_js_1.XML_ATTRKEY] = {
              ...parentObject[interfaces_js_1.XML_ATTRKEY],
              [xmlnsKey]: mapper.xmlNamespace
            };
          }
          const propertyObjectName = propertyMapper.serializedName !== "" ? objectName + "." + propertyMapper.serializedName : objectName;
          let toSerialize = object[key];
          const polymorphicDiscriminator = getPolymorphicDiscriminatorRecursively(serializer2, mapper);
          if (polymorphicDiscriminator && polymorphicDiscriminator.clientName === key && (toSerialize === void 0 || toSerialize === null)) {
            toSerialize = mapper.serializedName;
          }
          const serializedValue = serializer2.serialize(propertyMapper, toSerialize, propertyObjectName, options);
          if (serializedValue !== void 0 && propName !== void 0 && propName !== null) {
            const value = getXmlObjectValue(propertyMapper, serializedValue, isXml, options);
            if (isXml && propertyMapper.xmlIsAttribute) {
              parentObject[interfaces_js_1.XML_ATTRKEY] = parentObject[interfaces_js_1.XML_ATTRKEY] || {};
              parentObject[interfaces_js_1.XML_ATTRKEY][propName] = serializedValue;
            } else if (isXml && propertyMapper.xmlIsWrapped) {
              parentObject[propName] = { [propertyMapper.xmlElementName]: value };
            } else {
              parentObject[propName] = value;
            }
          }
        }
      }
      const additionalPropertiesMapper = resolveAdditionalProperties(serializer2, mapper, objectName);
      if (additionalPropertiesMapper) {
        const propNames = Object.keys(modelProps);
        for (const clientPropName in object) {
          const isAdditionalProperty = propNames.every((pn) => pn !== clientPropName);
          if (isAdditionalProperty) {
            payload[clientPropName] = serializer2.serialize(additionalPropertiesMapper, object[clientPropName], objectName + '["' + clientPropName + '"]', options);
          }
        }
      }
      return payload;
    }
    return object;
  }
  function getXmlObjectValue(propertyMapper, serializedValue, isXml, options) {
    if (!isXml || !propertyMapper.xmlNamespace) {
      return serializedValue;
    }
    const xmlnsKey = propertyMapper.xmlNamespacePrefix ? `xmlns:${propertyMapper.xmlNamespacePrefix}` : "xmlns";
    const xmlNamespace = { [xmlnsKey]: propertyMapper.xmlNamespace };
    if (["Composite"].includes(propertyMapper.type.name)) {
      if (serializedValue[interfaces_js_1.XML_ATTRKEY]) {
        return serializedValue;
      } else {
        const result2 = { ...serializedValue };
        result2[interfaces_js_1.XML_ATTRKEY] = xmlNamespace;
        return result2;
      }
    }
    const result = {};
    result[options.xml.xmlCharKey] = serializedValue;
    result[interfaces_js_1.XML_ATTRKEY] = xmlNamespace;
    return result;
  }
  function isSpecialXmlProperty(propertyName, options) {
    return [interfaces_js_1.XML_ATTRKEY, options.xml.xmlCharKey].includes(propertyName);
  }
  function deserializeCompositeType(serializer2, mapper, responseBody, objectName, options) {
    const xmlCharKey = options.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY;
    if (getPolymorphicDiscriminatorRecursively(serializer2, mapper)) {
      mapper = getPolymorphicMapper(serializer2, mapper, responseBody, "serializedName");
    }
    const modelProps = resolveModelProperties(serializer2, mapper, objectName);
    let instance = {};
    const handledPropertyNames = [];
    for (const key of Object.keys(modelProps)) {
      const propertyMapper = modelProps[key];
      const paths = splitSerializeName(modelProps[key].serializedName);
      handledPropertyNames.push(paths[0]);
      const { serializedName, xmlName, xmlElementName } = propertyMapper;
      let propertyObjectName = objectName;
      if (serializedName !== "" && serializedName !== void 0) {
        propertyObjectName = objectName + "." + serializedName;
      }
      const headerCollectionPrefix = propertyMapper.headerCollectionPrefix;
      if (headerCollectionPrefix) {
        const dictionary = {};
        for (const headerKey of Object.keys(responseBody)) {
          if (headerKey.startsWith(headerCollectionPrefix)) {
            dictionary[headerKey.substring(headerCollectionPrefix.length)] = serializer2.deserialize(propertyMapper.type.value, responseBody[headerKey], propertyObjectName, options);
          }
          handledPropertyNames.push(headerKey);
        }
        instance[key] = dictionary;
      } else if (serializer2.isXML) {
        if (propertyMapper.xmlIsAttribute && responseBody[interfaces_js_1.XML_ATTRKEY]) {
          instance[key] = serializer2.deserialize(propertyMapper, responseBody[interfaces_js_1.XML_ATTRKEY][xmlName], propertyObjectName, options);
        } else if (propertyMapper.xmlIsMsText) {
          if (responseBody[xmlCharKey] !== void 0) {
            instance[key] = responseBody[xmlCharKey];
          } else if (typeof responseBody === "string") {
            instance[key] = responseBody;
          }
        } else {
          const propertyName = xmlElementName || xmlName || serializedName;
          if (propertyMapper.xmlIsWrapped) {
            const wrapped = responseBody[xmlName];
            const elementList = wrapped?.[xmlElementName] ?? [];
            instance[key] = serializer2.deserialize(propertyMapper, elementList, propertyObjectName, options);
            handledPropertyNames.push(xmlName);
          } else {
            const property = responseBody[propertyName];
            instance[key] = serializer2.deserialize(propertyMapper, property, propertyObjectName, options);
            handledPropertyNames.push(propertyName);
          }
        }
      } else {
        let propertyInstance;
        let res = responseBody;
        let steps = 0;
        for (const item of paths) {
          if (!res)
            break;
          steps++;
          res = res[item];
        }
        if (res === null && steps < paths.length) {
          res = void 0;
        }
        propertyInstance = res;
        const polymorphicDiscriminator = mapper.type.polymorphicDiscriminator;
        if (polymorphicDiscriminator && key === polymorphicDiscriminator.clientName && (propertyInstance === void 0 || propertyInstance === null)) {
          propertyInstance = mapper.serializedName;
        }
        let serializedValue;
        if (Array.isArray(responseBody[key]) && modelProps[key].serializedName === "") {
          propertyInstance = responseBody[key];
          const arrayInstance = serializer2.deserialize(propertyMapper, propertyInstance, propertyObjectName, options);
          for (const [k, v] of Object.entries(instance)) {
            if (!Object.prototype.hasOwnProperty.call(arrayInstance, k)) {
              arrayInstance[k] = v;
            }
          }
          instance = arrayInstance;
        } else if (propertyInstance !== void 0 || propertyMapper.defaultValue !== void 0) {
          serializedValue = serializer2.deserialize(propertyMapper, propertyInstance, propertyObjectName, options);
          instance[key] = serializedValue;
        }
      }
    }
    const additionalPropertiesMapper = mapper.type.additionalProperties;
    if (additionalPropertiesMapper) {
      const isAdditionalProperty = (responsePropName) => {
        for (const clientPropName in modelProps) {
          const paths = splitSerializeName(modelProps[clientPropName].serializedName);
          if (paths[0] === responsePropName) {
            return false;
          }
        }
        return true;
      };
      for (const responsePropName in responseBody) {
        if (isAdditionalProperty(responsePropName)) {
          instance[responsePropName] = serializer2.deserialize(additionalPropertiesMapper, responseBody[responsePropName], objectName + '["' + responsePropName + '"]', options);
        }
      }
    } else if (responseBody && !options.ignoreUnknownProperties) {
      for (const key of Object.keys(responseBody)) {
        if (instance[key] === void 0 && !handledPropertyNames.includes(key) && !isSpecialXmlProperty(key, options)) {
          instance[key] = responseBody[key];
        }
      }
    }
    return instance;
  }
  function deserializeDictionaryType(serializer2, mapper, responseBody, objectName, options) {
    const value = mapper.type.value;
    if (!value || typeof value !== "object") {
      throw new Error(`"value" metadata for a Dictionary must be defined in the mapper and it must of type "object" in ${objectName}`);
    }
    if (responseBody) {
      const tempDictionary = {};
      for (const key of Object.keys(responseBody)) {
        tempDictionary[key] = serializer2.deserialize(value, responseBody[key], objectName, options);
      }
      return tempDictionary;
    }
    return responseBody;
  }
  function deserializeSequenceType(serializer2, mapper, responseBody, objectName, options) {
    let element = mapper.type.element;
    if (!element || typeof element !== "object") {
      throw new Error(`element" metadata for an Array must be defined in the mapper and it must of type "object" in ${objectName}`);
    }
    if (responseBody) {
      if (!Array.isArray(responseBody)) {
        responseBody = [responseBody];
      }
      if (element.type.name === "Composite" && element.type.className) {
        element = serializer2.modelMappers[element.type.className] ?? element;
      }
      const tempArray = [];
      for (let i = 0; i < responseBody.length; i++) {
        tempArray[i] = serializer2.deserialize(element, responseBody[i], `${objectName}[${i}]`, options);
      }
      return tempArray;
    }
    return responseBody;
  }
  function getIndexDiscriminator(discriminators, discriminatorValue, typeName) {
    const typeNamesToCheck = [typeName];
    while (typeNamesToCheck.length) {
      const currentName = typeNamesToCheck.shift();
      const indexDiscriminator = discriminatorValue === currentName ? discriminatorValue : currentName + "." + discriminatorValue;
      if (Object.prototype.hasOwnProperty.call(discriminators, indexDiscriminator)) {
        return discriminators[indexDiscriminator];
      } else {
        for (const [name, mapper] of Object.entries(discriminators)) {
          if (name.startsWith(currentName + ".") && mapper.type.uberParent === currentName && mapper.type.className) {
            typeNamesToCheck.push(mapper.type.className);
          }
        }
      }
    }
    return void 0;
  }
  function getPolymorphicMapper(serializer2, mapper, object, polymorphicPropertyName) {
    const polymorphicDiscriminator = getPolymorphicDiscriminatorRecursively(serializer2, mapper);
    if (polymorphicDiscriminator) {
      let discriminatorName = polymorphicDiscriminator[polymorphicPropertyName];
      if (discriminatorName) {
        if (polymorphicPropertyName === "serializedName") {
          discriminatorName = discriminatorName.replace(/\\/gi, "");
        }
        const discriminatorValue = object[discriminatorName];
        const typeName = mapper.type.uberParent ?? mapper.type.className;
        if (typeof discriminatorValue === "string" && typeName) {
          const polymorphicMapper = getIndexDiscriminator(serializer2.modelMappers.discriminators, discriminatorValue, typeName);
          if (polymorphicMapper) {
            mapper = polymorphicMapper;
          }
        }
      }
    }
    return mapper;
  }
  function getPolymorphicDiscriminatorRecursively(serializer2, mapper) {
    return mapper.type.polymorphicDiscriminator || getPolymorphicDiscriminatorSafely(serializer2, mapper.type.uberParent) || getPolymorphicDiscriminatorSafely(serializer2, mapper.type.className);
  }
  function getPolymorphicDiscriminatorSafely(serializer2, typeName) {
    return typeName && serializer2.modelMappers[typeName] && serializer2.modelMappers[typeName].type.polymorphicDiscriminator;
  }
  serializer.MapperTypeNames = {
    Base64Url: "Base64Url",
    Boolean: "Boolean",
    ByteArray: "ByteArray",
    Composite: "Composite",
    Date: "Date",
    DateTime: "DateTime",
    DateTimeRfc1123: "DateTimeRfc1123",
    Dictionary: "Dictionary",
    Enum: "Enum",
    Number: "Number",
    Object: "Object",
    Sequence: "Sequence",
    String: "String",
    Stream: "Stream",
    TimeSpan: "TimeSpan",
    UnixTime: "UnixTime"
  };
  return serializer;
}
var serviceClient = {};
var pipeline = {};
var deserializationPolicy = {};
var operationHelpers = {};
var state = {};
var hasRequiredState;
function requireState() {
  if (hasRequiredState) return state;
  hasRequiredState = 1;
  Object.defineProperty(state, "__esModule", { value: true });
  state.state = void 0;
  state.state = {
    operationRequestMap: /* @__PURE__ */ new WeakMap()
  };
  return state;
}
var hasRequiredOperationHelpers;
function requireOperationHelpers() {
  if (hasRequiredOperationHelpers) return operationHelpers;
  hasRequiredOperationHelpers = 1;
  Object.defineProperty(operationHelpers, "__esModule", { value: true });
  operationHelpers.getOperationArgumentValueFromParameter = getOperationArgumentValueFromParameter;
  operationHelpers.getOperationRequestInfo = getOperationRequestInfo;
  const state_js_1 = requireState();
  function getOperationArgumentValueFromParameter(operationArguments, parameter, fallbackObject) {
    let parameterPath = parameter.parameterPath;
    const parameterMapper = parameter.mapper;
    let value;
    if (typeof parameterPath === "string") {
      parameterPath = [parameterPath];
    }
    if (Array.isArray(parameterPath)) {
      if (parameterPath.length > 0) {
        if (parameterMapper.isConstant) {
          value = parameterMapper.defaultValue;
        } else {
          let propertySearchResult = getPropertyFromParameterPath(operationArguments, parameterPath);
          if (!propertySearchResult.propertyFound && fallbackObject) {
            propertySearchResult = getPropertyFromParameterPath(fallbackObject, parameterPath);
          }
          let useDefaultValue = false;
          if (!propertySearchResult.propertyFound) {
            useDefaultValue = parameterMapper.required || parameterPath[0] === "options" && parameterPath.length === 2;
          }
          value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
        }
      }
    } else {
      if (parameterMapper.required) {
        value = {};
      }
      for (const propertyName in parameterPath) {
        const propertyMapper = parameterMapper.type.modelProperties[propertyName];
        const propertyPath = parameterPath[propertyName];
        const propertyValue = getOperationArgumentValueFromParameter(operationArguments, {
          parameterPath: propertyPath,
          mapper: propertyMapper
        }, fallbackObject);
        if (propertyValue !== void 0) {
          if (!value) {
            value = {};
          }
          value[propertyName] = propertyValue;
        }
      }
    }
    return value;
  }
  function getPropertyFromParameterPath(parent, parameterPath) {
    const result = { propertyFound: false };
    let i = 0;
    for (; i < parameterPath.length; ++i) {
      const parameterPathPart = parameterPath[i];
      if (parent && parameterPathPart in parent) {
        parent = parent[parameterPathPart];
      } else {
        break;
      }
    }
    if (i === parameterPath.length) {
      result.propertyValue = parent;
      result.propertyFound = true;
    }
    return result;
  }
  const originalRequestSymbol = /* @__PURE__ */ Symbol.for("@azure/core-client original request");
  function hasOriginalRequest(request) {
    return originalRequestSymbol in request;
  }
  function getOperationRequestInfo(request) {
    if (hasOriginalRequest(request)) {
      return getOperationRequestInfo(request[originalRequestSymbol]);
    }
    let info = state_js_1.state.operationRequestMap.get(request);
    if (!info) {
      info = {};
      state_js_1.state.operationRequestMap.set(request, info);
    }
    return info;
  }
  return operationHelpers;
}
var hasRequiredDeserializationPolicy;
function requireDeserializationPolicy() {
  if (hasRequiredDeserializationPolicy) return deserializationPolicy;
  hasRequiredDeserializationPolicy = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deserializationPolicyName = void 0;
    exports.deserializationPolicy = deserializationPolicy2;
    const interfaces_js_1 = requireInterfaces();
    const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$1();
    const serializer_js_1 = requireSerializer();
    const operationHelpers_js_1 = requireOperationHelpers();
    const defaultJsonContentTypes = ["application/json", "text/json"];
    const defaultXmlContentTypes = ["application/xml", "application/atom+xml"];
    exports.deserializationPolicyName = "deserializationPolicy";
    function deserializationPolicy2(options = {}) {
      const jsonContentTypes = options.expectedContentTypes?.json ?? defaultJsonContentTypes;
      const xmlContentTypes = options.expectedContentTypes?.xml ?? defaultXmlContentTypes;
      const parseXML = options.parseXML;
      const serializerOptions = options.serializerOptions;
      const updatedOptions = {
        xml: {
          rootName: serializerOptions?.xml.rootName ?? "",
          includeRoot: serializerOptions?.xml.includeRoot ?? false,
          xmlCharKey: serializerOptions?.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY
        }
      };
      return {
        name: exports.deserializationPolicyName,
        async sendRequest(request, next) {
          const response = await next(request);
          return deserializeResponseBody(jsonContentTypes, xmlContentTypes, response, updatedOptions, parseXML);
        }
      };
    }
    function getOperationResponseMap(parsedResponse) {
      let result;
      const request = parsedResponse.request;
      const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(request);
      const operationSpec = operationInfo?.operationSpec;
      if (operationSpec) {
        if (!operationInfo?.operationResponseGetter) {
          result = operationSpec.responses[parsedResponse.status];
        } else {
          result = operationInfo?.operationResponseGetter(operationSpec, parsedResponse);
        }
      }
      return result;
    }
    function shouldDeserializeResponse(parsedResponse) {
      const request = parsedResponse.request;
      const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(request);
      const shouldDeserialize = operationInfo?.shouldDeserialize;
      let result;
      if (shouldDeserialize === void 0) {
        result = true;
      } else if (typeof shouldDeserialize === "boolean") {
        result = shouldDeserialize;
      } else {
        result = shouldDeserialize(parsedResponse);
      }
      return result;
    }
    async function deserializeResponseBody(jsonContentTypes, xmlContentTypes, response, options, parseXML) {
      const parsedResponse = await parse(jsonContentTypes, xmlContentTypes, response, options, parseXML);
      if (!shouldDeserializeResponse(parsedResponse)) {
        return parsedResponse;
      }
      const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(parsedResponse.request);
      const operationSpec = operationInfo?.operationSpec;
      if (!operationSpec || !operationSpec.responses) {
        return parsedResponse;
      }
      const responseSpec = getOperationResponseMap(parsedResponse);
      const { error, shouldReturnResponse } = handleErrorResponse(parsedResponse, operationSpec, responseSpec, options);
      if (error) {
        throw error;
      } else if (shouldReturnResponse) {
        return parsedResponse;
      }
      if (responseSpec) {
        if (responseSpec.bodyMapper) {
          let valueToDeserialize = parsedResponse.parsedBody;
          if (operationSpec.isXML && responseSpec.bodyMapper.type.name === serializer_js_1.MapperTypeNames.Sequence) {
            valueToDeserialize = typeof valueToDeserialize === "object" ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName] : [];
          }
          try {
            parsedResponse.parsedBody = operationSpec.serializer.deserialize(responseSpec.bodyMapper, valueToDeserialize, "operationRes.parsedBody", options);
          } catch (deserializeError) {
            const restError = new core_rest_pipeline_1.RestError(`Error ${deserializeError} occurred in deserializing the responseBody - ${parsedResponse.bodyAsText}`, {
              statusCode: parsedResponse.status,
              request: parsedResponse.request,
              response: parsedResponse
            });
            throw restError;
          }
        } else if (operationSpec.httpMethod === "HEAD") {
          parsedResponse.parsedBody = response.status >= 200 && response.status < 300;
        }
        if (responseSpec.headersMapper) {
          parsedResponse.parsedHeaders = operationSpec.serializer.deserialize(responseSpec.headersMapper, parsedResponse.headers.toJSON(), "operationRes.parsedHeaders", { xml: {}, ignoreUnknownProperties: true });
        }
      }
      return parsedResponse;
    }
    function isOperationSpecEmpty(operationSpec) {
      const expectedStatusCodes = Object.keys(operationSpec.responses);
      return expectedStatusCodes.length === 0 || expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default";
    }
    function handleErrorResponse(parsedResponse, operationSpec, responseSpec, options) {
      const isSuccessByStatus = 200 <= parsedResponse.status && parsedResponse.status < 300;
      const isExpectedStatusCode = isOperationSpecEmpty(operationSpec) ? isSuccessByStatus : !!responseSpec;
      if (isExpectedStatusCode) {
        if (responseSpec) {
          if (!responseSpec.isError) {
            return { error: null, shouldReturnResponse: false };
          }
        } else {
          return { error: null, shouldReturnResponse: false };
        }
      }
      const errorResponseSpec = responseSpec ?? operationSpec.responses.default;
      const initialErrorMessage = parsedResponse.request.streamResponseStatusCodes?.has(parsedResponse.status) ? `Unexpected status code: ${parsedResponse.status}` : parsedResponse.bodyAsText;
      const error = new core_rest_pipeline_1.RestError(initialErrorMessage, {
        statusCode: parsedResponse.status,
        request: parsedResponse.request,
        response: parsedResponse
      });
      if (!errorResponseSpec && !(parsedResponse.parsedBody?.error?.code && parsedResponse.parsedBody?.error?.message)) {
        throw error;
      }
      const defaultBodyMapper = errorResponseSpec?.bodyMapper;
      const defaultHeadersMapper = errorResponseSpec?.headersMapper;
      try {
        if (parsedResponse.parsedBody) {
          const parsedBody = parsedResponse.parsedBody;
          let deserializedError;
          if (defaultBodyMapper) {
            let valueToDeserialize = parsedBody;
            if (operationSpec.isXML && defaultBodyMapper.type.name === serializer_js_1.MapperTypeNames.Sequence) {
              valueToDeserialize = [];
              const elementName = defaultBodyMapper.xmlElementName;
              if (typeof parsedBody === "object" && elementName) {
                valueToDeserialize = parsedBody[elementName];
              }
            }
            deserializedError = operationSpec.serializer.deserialize(defaultBodyMapper, valueToDeserialize, "error.response.parsedBody", options);
          }
          const internalError = parsedBody.error || deserializedError || parsedBody;
          error.code = internalError.code;
          if (internalError.message) {
            error.message = internalError.message;
          }
          if (defaultBodyMapper) {
            error.response.parsedBody = deserializedError;
          }
        }
        if (parsedResponse.headers && defaultHeadersMapper) {
          error.response.parsedHeaders = operationSpec.serializer.deserialize(defaultHeadersMapper, parsedResponse.headers.toJSON(), "operationRes.parsedHeaders");
        }
      } catch (defaultError) {
        error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody - "${parsedResponse.bodyAsText}" for the default response.`;
      }
      return { error, shouldReturnResponse: false };
    }
    async function parse(jsonContentTypes, xmlContentTypes, operationResponse, opts, parseXML) {
      if (!operationResponse.request.streamResponseStatusCodes?.has(operationResponse.status) && operationResponse.bodyAsText) {
        const text = operationResponse.bodyAsText;
        const contentType = operationResponse.headers.get("Content-Type") || "";
        const contentComponents = !contentType ? [] : contentType.split(";").map((component) => component.toLowerCase());
        try {
          if (contentComponents.length === 0 || contentComponents.some((component) => jsonContentTypes.indexOf(component) !== -1)) {
            operationResponse.parsedBody = JSON.parse(text);
            return operationResponse;
          } else if (contentComponents.some((component) => xmlContentTypes.indexOf(component) !== -1)) {
            if (!parseXML) {
              throw new Error("Parsing XML not supported.");
            }
            const body = await parseXML(text, opts.xml);
            operationResponse.parsedBody = body;
            return operationResponse;
          }
        } catch (err) {
          const msg = `Error "${err}" occurred while parsing the response body - ${operationResponse.bodyAsText}.`;
          const errCode = err.code || core_rest_pipeline_1.RestError.PARSE_ERROR;
          const e = new core_rest_pipeline_1.RestError(msg, {
            code: errCode,
            statusCode: operationResponse.status,
            request: operationResponse.request,
            response: operationResponse
          });
          throw e;
        }
      }
      return operationResponse;
    }
  })(deserializationPolicy);
  return deserializationPolicy;
}
var serializationPolicy = {};
var interfaceHelpers = {};
var hasRequiredInterfaceHelpers;
function requireInterfaceHelpers() {
  if (hasRequiredInterfaceHelpers) return interfaceHelpers;
  hasRequiredInterfaceHelpers = 1;
  Object.defineProperty(interfaceHelpers, "__esModule", { value: true });
  interfaceHelpers.getStreamingResponseStatusCodes = getStreamingResponseStatusCodes;
  interfaceHelpers.getPathStringFromParameter = getPathStringFromParameter;
  const serializer_js_1 = requireSerializer();
  function getStreamingResponseStatusCodes(operationSpec) {
    const result = /* @__PURE__ */ new Set();
    for (const statusCode in operationSpec.responses) {
      const operationResponse = operationSpec.responses[statusCode];
      if (operationResponse.bodyMapper && operationResponse.bodyMapper.type.name === serializer_js_1.MapperTypeNames.Stream) {
        result.add(Number(statusCode));
      }
    }
    return result;
  }
  function getPathStringFromParameter(parameter) {
    const { parameterPath, mapper } = parameter;
    let result;
    if (typeof parameterPath === "string") {
      result = parameterPath;
    } else if (Array.isArray(parameterPath)) {
      result = parameterPath.join(".");
    } else {
      result = mapper.serializedName;
    }
    return result;
  }
  return interfaceHelpers;
}
var hasRequiredSerializationPolicy;
function requireSerializationPolicy() {
  if (hasRequiredSerializationPolicy) return serializationPolicy;
  hasRequiredSerializationPolicy = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializationPolicyName = void 0;
    exports.serializationPolicy = serializationPolicy2;
    exports.serializeHeaders = serializeHeaders;
    exports.serializeRequestBody = serializeRequestBody;
    const interfaces_js_1 = requireInterfaces();
    const operationHelpers_js_1 = requireOperationHelpers();
    const serializer_js_1 = requireSerializer();
    const interfaceHelpers_js_1 = requireInterfaceHelpers();
    exports.serializationPolicyName = "serializationPolicy";
    function serializationPolicy2(options = {}) {
      const stringifyXML = options.stringifyXML;
      return {
        name: exports.serializationPolicyName,
        async sendRequest(request, next) {
          const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(request);
          const operationSpec = operationInfo?.operationSpec;
          const operationArguments = operationInfo?.operationArguments;
          if (operationSpec && operationArguments) {
            serializeHeaders(request, operationArguments, operationSpec);
            serializeRequestBody(request, operationArguments, operationSpec, stringifyXML);
          }
          return next(request);
        }
      };
    }
    function serializeHeaders(request, operationArguments, operationSpec) {
      if (operationSpec.headerParameters) {
        for (const headerParameter of operationSpec.headerParameters) {
          let headerValue = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, headerParameter);
          if (headerValue !== null && headerValue !== void 0 || headerParameter.mapper.required) {
            headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, (0, interfaceHelpers_js_1.getPathStringFromParameter)(headerParameter));
            const headerCollectionPrefix = headerParameter.mapper.headerCollectionPrefix;
            if (headerCollectionPrefix) {
              for (const key of Object.keys(headerValue)) {
                request.headers.set(headerCollectionPrefix + key, headerValue[key]);
              }
            } else {
              request.headers.set(headerParameter.mapper.serializedName || (0, interfaceHelpers_js_1.getPathStringFromParameter)(headerParameter), headerValue);
            }
          }
        }
      }
      const customHeaders = operationArguments.options?.requestOptions?.customHeaders;
      if (customHeaders) {
        for (const customHeaderName of Object.keys(customHeaders)) {
          request.headers.set(customHeaderName, customHeaders[customHeaderName]);
        }
      }
    }
    function serializeRequestBody(request, operationArguments, operationSpec, stringifyXML = function() {
      throw new Error("XML serialization unsupported!");
    }) {
      const serializerOptions = operationArguments.options?.serializerOptions;
      const updatedOptions = {
        xml: {
          rootName: serializerOptions?.xml.rootName ?? "",
          includeRoot: serializerOptions?.xml.includeRoot ?? false,
          xmlCharKey: serializerOptions?.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY
        }
      };
      const xmlCharKey = updatedOptions.xml.xmlCharKey;
      if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
        request.body = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, operationSpec.requestBody);
        const bodyMapper = operationSpec.requestBody.mapper;
        const { required, serializedName, xmlName, xmlElementName, xmlNamespace, xmlNamespacePrefix, nullable } = bodyMapper;
        const typeName = bodyMapper.type.name;
        try {
          if (request.body !== void 0 && request.body !== null || nullable && request.body === null || required) {
            const requestBodyParameterPathString = (0, interfaceHelpers_js_1.getPathStringFromParameter)(operationSpec.requestBody);
            request.body = operationSpec.serializer.serialize(bodyMapper, request.body, requestBodyParameterPathString, updatedOptions);
            const isStream = typeName === serializer_js_1.MapperTypeNames.Stream;
            if (operationSpec.isXML) {
              const xmlnsKey = xmlNamespacePrefix ? `xmlns:${xmlNamespacePrefix}` : "xmlns";
              const value = getXmlValueWithNamespace(xmlNamespace, xmlnsKey, typeName, request.body, updatedOptions);
              if (typeName === serializer_js_1.MapperTypeNames.Sequence) {
                request.body = stringifyXML(prepareXMLRootList(value, xmlElementName || xmlName || serializedName, xmlnsKey, xmlNamespace), { rootName: xmlName || serializedName, xmlCharKey });
              } else if (!isStream) {
                request.body = stringifyXML(value, {
                  rootName: xmlName || serializedName,
                  xmlCharKey
                });
              }
            } else if (typeName === serializer_js_1.MapperTypeNames.String && (operationSpec.contentType?.match("text/plain") || operationSpec.mediaType === "text")) {
              return;
            } else if (!isStream) {
              request.body = JSON.stringify(request.body);
            }
          }
        } catch (error) {
          throw new Error(`Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(serializedName, void 0, "  ")}.`);
        }
      } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
        request.formData = {};
        for (const formDataParameter of operationSpec.formDataParameters) {
          const formDataParameterValue = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, formDataParameter);
          if (formDataParameterValue !== void 0 && formDataParameterValue !== null) {
            const formDataParameterPropertyName = formDataParameter.mapper.serializedName || (0, interfaceHelpers_js_1.getPathStringFromParameter)(formDataParameter);
            request.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, (0, interfaceHelpers_js_1.getPathStringFromParameter)(formDataParameter), updatedOptions);
          }
        }
      }
    }
    function getXmlValueWithNamespace(xmlNamespace, xmlnsKey, typeName, serializedValue, options) {
      if (xmlNamespace && !["Composite", "Sequence", "Dictionary"].includes(typeName)) {
        const result = {};
        result[options.xml.xmlCharKey] = serializedValue;
        result[interfaces_js_1.XML_ATTRKEY] = { [xmlnsKey]: xmlNamespace };
        return result;
      }
      return serializedValue;
    }
    function prepareXMLRootList(obj, elementName, xmlNamespaceKey, xmlNamespace) {
      if (!Array.isArray(obj)) {
        obj = [obj];
      }
      if (!xmlNamespaceKey || !xmlNamespace) {
        return { [elementName]: obj };
      }
      const result = { [elementName]: obj };
      result[interfaces_js_1.XML_ATTRKEY] = { [xmlNamespaceKey]: xmlNamespace };
      return result;
    }
  })(serializationPolicy);
  return serializationPolicy;
}
var hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline) return pipeline;
  hasRequiredPipeline = 1;
  Object.defineProperty(pipeline, "__esModule", { value: true });
  pipeline.createClientPipeline = createClientPipeline;
  const deserializationPolicy_js_1 = requireDeserializationPolicy();
  const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$1();
  const serializationPolicy_js_1 = requireSerializationPolicy();
  function createClientPipeline(options = {}) {
    const pipeline2 = (0, core_rest_pipeline_1.createPipelineFromOptions)(options ?? {});
    if (options.credentialOptions) {
      pipeline2.addPolicy((0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({
        credential: options.credentialOptions.credential,
        scopes: options.credentialOptions.credentialScopes
      }));
    }
    pipeline2.addPolicy((0, serializationPolicy_js_1.serializationPolicy)(options.serializationOptions), { phase: "Serialize" });
    pipeline2.addPolicy((0, deserializationPolicy_js_1.deserializationPolicy)(options.deserializationOptions), {
      phase: "Deserialize"
    });
    return pipeline2;
  }
  return pipeline;
}
var httpClientCache = {};
var hasRequiredHttpClientCache;
function requireHttpClientCache() {
  if (hasRequiredHttpClientCache) return httpClientCache;
  hasRequiredHttpClientCache = 1;
  Object.defineProperty(httpClientCache, "__esModule", { value: true });
  httpClientCache.getCachedDefaultHttpClient = getCachedDefaultHttpClient;
  const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$1();
  let cachedHttpClient;
  function getCachedDefaultHttpClient() {
    if (!cachedHttpClient) {
      cachedHttpClient = (0, core_rest_pipeline_1.createDefaultHttpClient)();
    }
    return cachedHttpClient;
  }
  return httpClientCache;
}
var urlHelpers = {};
var hasRequiredUrlHelpers;
function requireUrlHelpers() {
  if (hasRequiredUrlHelpers) return urlHelpers;
  hasRequiredUrlHelpers = 1;
  Object.defineProperty(urlHelpers, "__esModule", { value: true });
  urlHelpers.getRequestUrl = getRequestUrl;
  urlHelpers.appendQueryParams = appendQueryParams;
  const operationHelpers_js_1 = requireOperationHelpers();
  const interfaceHelpers_js_1 = requireInterfaceHelpers();
  const CollectionFormatToDelimiterMap = {
    CSV: ",",
    SSV: " ",
    Multi: "Multi",
    TSV: "	",
    Pipes: "|"
  };
  function getRequestUrl(baseUri, operationSpec, operationArguments, fallbackObject) {
    const urlReplacements = calculateUrlReplacements(operationSpec, operationArguments, fallbackObject);
    let isAbsolutePath = false;
    let requestUrl = replaceAll(baseUri, urlReplacements);
    if (operationSpec.path) {
      let path = replaceAll(operationSpec.path, urlReplacements);
      if (operationSpec.path === "/{nextLink}" && path.startsWith("/")) {
        path = path.substring(1);
      }
      if (isAbsoluteUrl(path)) {
        requestUrl = path;
        isAbsolutePath = true;
      } else {
        requestUrl = appendPath(requestUrl, path);
      }
    }
    const { queryParams, sequenceParams } = calculateQueryParameters(operationSpec, operationArguments, fallbackObject);
    requestUrl = appendQueryParams(requestUrl, queryParams, sequenceParams, isAbsolutePath);
    return requestUrl;
  }
  function replaceAll(input, replacements) {
    let result = input;
    for (const [searchValue, replaceValue] of replacements) {
      result = result.split(searchValue).join(replaceValue);
    }
    return result;
  }
  function calculateUrlReplacements(operationSpec, operationArguments, fallbackObject) {
    const result = /* @__PURE__ */ new Map();
    if (operationSpec.urlParameters?.length) {
      for (const urlParameter of operationSpec.urlParameters) {
        let urlParameterValue = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, urlParameter, fallbackObject);
        const parameterPathString = (0, interfaceHelpers_js_1.getPathStringFromParameter)(urlParameter);
        urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, parameterPathString);
        if (!urlParameter.skipEncoding) {
          urlParameterValue = encodeURIComponent(urlParameterValue);
        }
        result.set(`{${urlParameter.mapper.serializedName || parameterPathString}}`, urlParameterValue);
      }
    }
    return result;
  }
  function isAbsoluteUrl(url) {
    return url.includes("://");
  }
  function appendPath(url, pathToAppend) {
    if (!pathToAppend) {
      return url;
    }
    const parsedUrl = new URL(url);
    let newPath = parsedUrl.pathname;
    if (!newPath.endsWith("/")) {
      newPath = `${newPath}/`;
    }
    if (pathToAppend.startsWith("/")) {
      pathToAppend = pathToAppend.substring(1);
    }
    const searchStart = pathToAppend.indexOf("?");
    if (searchStart !== -1) {
      const path = pathToAppend.substring(0, searchStart);
      const search = pathToAppend.substring(searchStart + 1);
      newPath = newPath + path;
      if (search) {
        parsedUrl.search = parsedUrl.search ? `${parsedUrl.search}&${search}` : search;
      }
    } else {
      newPath = newPath + pathToAppend;
    }
    parsedUrl.pathname = newPath;
    return parsedUrl.toString();
  }
  function calculateQueryParameters(operationSpec, operationArguments, fallbackObject) {
    const result = /* @__PURE__ */ new Map();
    const sequenceParams = /* @__PURE__ */ new Set();
    if (operationSpec.queryParameters?.length) {
      for (const queryParameter of operationSpec.queryParameters) {
        if (queryParameter.mapper.type.name === "Sequence" && queryParameter.mapper.serializedName) {
          sequenceParams.add(queryParameter.mapper.serializedName);
        }
        let queryParameterValue = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, queryParameter, fallbackObject);
        if (queryParameterValue !== void 0 && queryParameterValue !== null || queryParameter.mapper.required) {
          queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, (0, interfaceHelpers_js_1.getPathStringFromParameter)(queryParameter));
          const delimiter = queryParameter.collectionFormat ? CollectionFormatToDelimiterMap[queryParameter.collectionFormat] : "";
          if (Array.isArray(queryParameterValue)) {
            queryParameterValue = queryParameterValue.map((item) => {
              if (item === null || item === void 0) {
                return "";
              }
              return item;
            });
          }
          if (queryParameter.collectionFormat === "Multi" && queryParameterValue.length === 0) {
            continue;
          } else if (Array.isArray(queryParameterValue) && (queryParameter.collectionFormat === "SSV" || queryParameter.collectionFormat === "TSV")) {
            queryParameterValue = queryParameterValue.join(delimiter);
          }
          if (!queryParameter.skipEncoding) {
            if (Array.isArray(queryParameterValue)) {
              queryParameterValue = queryParameterValue.map((item) => {
                return encodeURIComponent(item);
              });
            } else {
              queryParameterValue = encodeURIComponent(queryParameterValue);
            }
          }
          if (Array.isArray(queryParameterValue) && (queryParameter.collectionFormat === "CSV" || queryParameter.collectionFormat === "Pipes")) {
            queryParameterValue = queryParameterValue.join(delimiter);
          }
          result.set(queryParameter.mapper.serializedName || (0, interfaceHelpers_js_1.getPathStringFromParameter)(queryParameter), queryParameterValue);
        }
      }
    }
    return {
      queryParams: result,
      sequenceParams
    };
  }
  function simpleParseQueryParams(queryString) {
    const result = /* @__PURE__ */ new Map();
    if (!queryString || queryString[0] !== "?") {
      return result;
    }
    queryString = queryString.slice(1);
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const [name, value] = pair.split("=", 2);
      const existingValue = result.get(name);
      if (existingValue) {
        if (Array.isArray(existingValue)) {
          existingValue.push(value);
        } else {
          result.set(name, [existingValue, value]);
        }
      } else {
        result.set(name, value);
      }
    }
    return result;
  }
  function appendQueryParams(url, queryParams, sequenceParams, noOverwrite = false) {
    if (queryParams.size === 0) {
      return url;
    }
    const parsedUrl = new URL(url);
    const combinedParams = simpleParseQueryParams(parsedUrl.search);
    for (const [name, value] of queryParams) {
      const existingValue = combinedParams.get(name);
      if (Array.isArray(existingValue)) {
        if (Array.isArray(value)) {
          existingValue.push(...value);
          const valueSet = new Set(existingValue);
          combinedParams.set(name, Array.from(valueSet));
        } else {
          existingValue.push(value);
        }
      } else if (existingValue) {
        if (Array.isArray(value)) {
          value.unshift(existingValue);
        } else if (sequenceParams.has(name)) {
          combinedParams.set(name, [existingValue, value]);
        }
        if (!noOverwrite) {
          combinedParams.set(name, value);
        }
      } else {
        combinedParams.set(name, value);
      }
    }
    const searchPieces = [];
    for (const [name, value] of combinedParams) {
      if (typeof value === "string") {
        searchPieces.push(`${name}=${value}`);
      } else if (Array.isArray(value)) {
        for (const subValue of value) {
          searchPieces.push(`${name}=${subValue}`);
        }
      } else {
        searchPieces.push(`${name}=${value}`);
      }
    }
    parsedUrl.search = searchPieces.length ? `?${searchPieces.join("&")}` : "";
    return parsedUrl.toString();
  }
  return urlHelpers;
}
var log = {};
var hasRequiredLog;
function requireLog() {
  if (hasRequiredLog) return log;
  hasRequiredLog = 1;
  Object.defineProperty(log, "__esModule", { value: true });
  log.logger = void 0;
  const logger_1 = /* @__PURE__ */ requireCommonjs$2();
  log.logger = (0, logger_1.createClientLogger)("core-client");
  return log;
}
var hasRequiredServiceClient;
function requireServiceClient() {
  if (hasRequiredServiceClient) return serviceClient;
  hasRequiredServiceClient = 1;
  Object.defineProperty(serviceClient, "__esModule", { value: true });
  serviceClient.ServiceClient = void 0;
  const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$1();
  const pipeline_js_1 = requirePipeline();
  const utils_js_1 = requireUtils();
  const httpClientCache_js_1 = requireHttpClientCache();
  const operationHelpers_js_1 = requireOperationHelpers();
  const urlHelpers_js_1 = requireUrlHelpers();
  const interfaceHelpers_js_1 = requireInterfaceHelpers();
  const log_js_1 = requireLog();
  class ServiceClient {
    /**
     * If specified, this is the base URI that requests will be made against for this ServiceClient.
     * If it is not specified, then all OperationSpecs must contain a baseUrl property.
     */
    _endpoint;
    /**
     * The default request content type for the service.
     * Used if no requestContentType is present on an OperationSpec.
     */
    _requestContentType;
    /**
     * Set to true if the request is sent over HTTP instead of HTTPS
     */
    _allowInsecureConnection;
    /**
     * The HTTP client that will be used to send requests.
     */
    _httpClient;
    /**
     * The pipeline used by this client to make requests
     */
    pipeline;
    /**
     * The ServiceClient constructor
     * @param options - The service client options that govern the behavior of the client.
     */
    constructor(options = {}) {
      this._requestContentType = options.requestContentType;
      this._endpoint = options.endpoint ?? options.baseUri;
      if (options.baseUri) {
        log_js_1.logger.warning("The baseUri option for SDK Clients has been deprecated, please use endpoint instead.");
      }
      this._allowInsecureConnection = options.allowInsecureConnection;
      this._httpClient = options.httpClient || (0, httpClientCache_js_1.getCachedDefaultHttpClient)();
      this.pipeline = options.pipeline || createDefaultPipeline(options);
      if (options.additionalPolicies?.length) {
        for (const { policy, position } of options.additionalPolicies) {
          const afterPhase = position === "perRetry" ? "Sign" : void 0;
          this.pipeline.addPolicy(policy, {
            afterPhase
          });
        }
      }
    }
    /**
     * Send the provided httpRequest.
     */
    async sendRequest(request) {
      return this.pipeline.sendRequest(this._httpClient, request);
    }
    /**
     * Send an HTTP request that is populated using the provided OperationSpec.
     * @typeParam T - The typed result of the request, based on the OperationSpec.
     * @param operationArguments - The arguments that the HTTP request's templated values will be populated from.
     * @param operationSpec - The OperationSpec to use to populate the httpRequest.
     */
    async sendOperationRequest(operationArguments, operationSpec) {
      const endpoint = operationSpec.baseUrl || this._endpoint;
      if (!endpoint) {
        throw new Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a endpoint string property that contains the base URL to use.");
      }
      const url = (0, urlHelpers_js_1.getRequestUrl)(endpoint, operationSpec, operationArguments, this);
      const request = (0, core_rest_pipeline_1.createPipelineRequest)({
        url
      });
      request.method = operationSpec.httpMethod;
      const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(request);
      operationInfo.operationSpec = operationSpec;
      operationInfo.operationArguments = operationArguments;
      const contentType = operationSpec.contentType || this._requestContentType;
      if (contentType && operationSpec.requestBody) {
        request.headers.set("Content-Type", contentType);
      }
      const options = operationArguments.options;
      if (options) {
        const requestOptions = options.requestOptions;
        if (requestOptions) {
          if (requestOptions.timeout) {
            request.timeout = requestOptions.timeout;
          }
          if (requestOptions.onUploadProgress) {
            request.onUploadProgress = requestOptions.onUploadProgress;
          }
          if (requestOptions.onDownloadProgress) {
            request.onDownloadProgress = requestOptions.onDownloadProgress;
          }
          if (requestOptions.shouldDeserialize !== void 0) {
            operationInfo.shouldDeserialize = requestOptions.shouldDeserialize;
          }
          if (requestOptions.allowInsecureConnection) {
            request.allowInsecureConnection = true;
          }
        }
        if (options.abortSignal) {
          request.abortSignal = options.abortSignal;
        }
        if (options.tracingOptions) {
          request.tracingOptions = options.tracingOptions;
        }
      }
      if (this._allowInsecureConnection) {
        request.allowInsecureConnection = true;
      }
      if (request.streamResponseStatusCodes === void 0) {
        request.streamResponseStatusCodes = (0, interfaceHelpers_js_1.getStreamingResponseStatusCodes)(operationSpec);
      }
      try {
        const rawResponse = await this.sendRequest(request);
        const flatResponse = (0, utils_js_1.flattenResponse)(rawResponse, operationSpec.responses[rawResponse.status]);
        if (options?.onResponse) {
          options.onResponse(rawResponse, flatResponse);
        }
        return flatResponse;
      } catch (error) {
        if (typeof error === "object" && error?.response) {
          const rawResponse = error.response;
          const flatResponse = (0, utils_js_1.flattenResponse)(rawResponse, operationSpec.responses[error.statusCode] || operationSpec.responses["default"]);
          error.details = flatResponse;
          if (options?.onResponse) {
            options.onResponse(rawResponse, flatResponse, error);
          }
        }
        throw error;
      }
    }
  }
  serviceClient.ServiceClient = ServiceClient;
  function createDefaultPipeline(options) {
    const credentialScopes = getCredentialScopes(options);
    const credentialOptions = options.credential && credentialScopes ? { credentialScopes, credential: options.credential } : void 0;
    return (0, pipeline_js_1.createClientPipeline)({
      ...options,
      credentialOptions
    });
  }
  function getCredentialScopes(options) {
    if (options.credentialScopes) {
      return options.credentialScopes;
    }
    if (options.endpoint) {
      return `${options.endpoint}/.default`;
    }
    if (options.baseUri) {
      return `${options.baseUri}/.default`;
    }
    if (options.credential && !options.credentialScopes) {
      throw new Error(`When using credentials, the ServiceClientOptions must contain either a endpoint or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy`);
    }
    return void 0;
  }
  return serviceClient;
}
var authorizeRequestOnClaimChallenge = {};
var hasRequiredAuthorizeRequestOnClaimChallenge;
function requireAuthorizeRequestOnClaimChallenge() {
  if (hasRequiredAuthorizeRequestOnClaimChallenge) return authorizeRequestOnClaimChallenge;
  hasRequiredAuthorizeRequestOnClaimChallenge = 1;
  Object.defineProperty(authorizeRequestOnClaimChallenge, "__esModule", { value: true });
  authorizeRequestOnClaimChallenge.parseCAEChallenge = parseCAEChallenge;
  authorizeRequestOnClaimChallenge.authorizeRequestOnClaimChallenge = authorizeRequestOnClaimChallenge$1;
  const log_js_1 = requireLog();
  const base64_js_1 = requireBase64();
  function parseCAEChallenge(challenges) {
    const bearerChallenges = `, ${challenges.trim()}`.split(", Bearer ").filter((x) => x);
    return bearerChallenges.map((challenge) => {
      const challengeParts = `${challenge.trim()}, `.split('", ').filter((x) => x);
      const keyValuePairs = challengeParts.map((keyValue) => (([key, value]) => ({ [key]: value }))(keyValue.trim().split('="')));
      return keyValuePairs.reduce((a, b) => ({ ...a, ...b }), {});
    });
  }
  async function authorizeRequestOnClaimChallenge$1(onChallengeOptions) {
    const { scopes, response } = onChallengeOptions;
    const logger = onChallengeOptions.logger || log_js_1.logger;
    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
      logger.info(`The WWW-Authenticate header was missing. Failed to perform the Continuous Access Evaluation authentication flow.`);
      return false;
    }
    const challenges = parseCAEChallenge(challenge) || [];
    const parsedChallenge = challenges.find((x) => x.claims);
    if (!parsedChallenge) {
      logger.info(`The WWW-Authenticate header was missing the necessary "claims" to perform the Continuous Access Evaluation authentication flow.`);
      return false;
    }
    const accessToken = await onChallengeOptions.getAccessToken(parsedChallenge.scope ? [parsedChallenge.scope] : scopes, {
      claims: (0, base64_js_1.decodeStringToString)(parsedChallenge.claims)
    });
    if (!accessToken) {
      return false;
    }
    onChallengeOptions.request.headers.set("Authorization", `${accessToken.tokenType ?? "Bearer"} ${accessToken.token}`);
    return true;
  }
  return authorizeRequestOnClaimChallenge;
}
var authorizeRequestOnTenantChallenge = {};
var hasRequiredAuthorizeRequestOnTenantChallenge;
function requireAuthorizeRequestOnTenantChallenge() {
  if (hasRequiredAuthorizeRequestOnTenantChallenge) return authorizeRequestOnTenantChallenge;
  hasRequiredAuthorizeRequestOnTenantChallenge = 1;
  Object.defineProperty(authorizeRequestOnTenantChallenge, "__esModule", { value: true });
  authorizeRequestOnTenantChallenge.authorizeRequestOnTenantChallenge = void 0;
  const Constants = {
    DefaultScope: "/.default",
    /**
     * Defines constants for use with HTTP headers.
     */
    HeaderConstants: {
      /**
       * The Authorization header.
       */
      AUTHORIZATION: "authorization"
    }
  };
  function isUuid(text) {
    return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(text);
  }
  const authorizeRequestOnTenantChallenge$1 = async (challengeOptions) => {
    const requestOptions = requestToOptions(challengeOptions.request);
    const challenge = getChallenge(challengeOptions.response);
    if (challenge) {
      const challengeInfo = parseChallenge(challenge);
      const challengeScopes = buildScopes(challengeOptions, challengeInfo);
      const tenantId = extractTenantId(challengeInfo);
      if (!tenantId) {
        return false;
      }
      const accessToken = await challengeOptions.getAccessToken(challengeScopes, {
        ...requestOptions,
        tenantId
      });
      if (!accessToken) {
        return false;
      }
      challengeOptions.request.headers.set(Constants.HeaderConstants.AUTHORIZATION, `${accessToken.tokenType ?? "Bearer"} ${accessToken.token}`);
      return true;
    }
    return false;
  };
  authorizeRequestOnTenantChallenge.authorizeRequestOnTenantChallenge = authorizeRequestOnTenantChallenge$1;
  function extractTenantId(challengeInfo) {
    const parsedAuthUri = new URL(challengeInfo.authorization_uri);
    const pathSegments = parsedAuthUri.pathname.split("/");
    const tenantId = pathSegments[1];
    if (tenantId && isUuid(tenantId)) {
      return tenantId;
    }
    return void 0;
  }
  function buildScopes(challengeOptions, challengeInfo) {
    if (!challengeInfo.resource_id) {
      return challengeOptions.scopes;
    }
    const challengeScopes = new URL(challengeInfo.resource_id);
    challengeScopes.pathname = Constants.DefaultScope;
    let scope = challengeScopes.toString();
    if (scope === "https://disk.azure.com/.default") {
      scope = "https://disk.azure.com//.default";
    }
    return [scope];
  }
  function getChallenge(response) {
    const challenge = response.headers.get("WWW-Authenticate");
    if (response.status === 401 && challenge) {
      return challenge;
    }
    return;
  }
  function parseChallenge(challenge) {
    const bearerChallenge = challenge.slice("Bearer ".length);
    const challengeParts = `${bearerChallenge.trim()} `.split(" ").filter((x) => x);
    const keyValuePairs = challengeParts.map((keyValue) => (([key, value]) => ({ [key]: value }))(keyValue.trim().split("=")));
    return keyValuePairs.reduce((a, b) => ({ ...a, ...b }), {});
  }
  function requestToOptions(request) {
    return {
      abortSignal: request.abortSignal,
      requestOptions: {
        timeout: request.timeout
      },
      tracingOptions: request.tracingOptions
    };
  }
  return authorizeRequestOnTenantChallenge;
}
var hasRequiredCommonjs;
function requireCommonjs() {
  if (hasRequiredCommonjs) return commonjs;
  hasRequiredCommonjs = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.authorizeRequestOnTenantChallenge = exports.authorizeRequestOnClaimChallenge = exports.serializationPolicyName = exports.serializationPolicy = exports.deserializationPolicyName = exports.deserializationPolicy = exports.XML_CHARKEY = exports.XML_ATTRKEY = exports.createClientPipeline = exports.ServiceClient = exports.MapperTypeNames = exports.createSerializer = void 0;
    var serializer_js_1 = requireSerializer();
    Object.defineProperty(exports, "createSerializer", { enumerable: true, get: function() {
      return serializer_js_1.createSerializer;
    } });
    Object.defineProperty(exports, "MapperTypeNames", { enumerable: true, get: function() {
      return serializer_js_1.MapperTypeNames;
    } });
    var serviceClient_js_1 = requireServiceClient();
    Object.defineProperty(exports, "ServiceClient", { enumerable: true, get: function() {
      return serviceClient_js_1.ServiceClient;
    } });
    var pipeline_js_1 = requirePipeline();
    Object.defineProperty(exports, "createClientPipeline", { enumerable: true, get: function() {
      return pipeline_js_1.createClientPipeline;
    } });
    var interfaces_js_1 = requireInterfaces();
    Object.defineProperty(exports, "XML_ATTRKEY", { enumerable: true, get: function() {
      return interfaces_js_1.XML_ATTRKEY;
    } });
    Object.defineProperty(exports, "XML_CHARKEY", { enumerable: true, get: function() {
      return interfaces_js_1.XML_CHARKEY;
    } });
    var deserializationPolicy_js_1 = requireDeserializationPolicy();
    Object.defineProperty(exports, "deserializationPolicy", { enumerable: true, get: function() {
      return deserializationPolicy_js_1.deserializationPolicy;
    } });
    Object.defineProperty(exports, "deserializationPolicyName", { enumerable: true, get: function() {
      return deserializationPolicy_js_1.deserializationPolicyName;
    } });
    var serializationPolicy_js_1 = requireSerializationPolicy();
    Object.defineProperty(exports, "serializationPolicy", { enumerable: true, get: function() {
      return serializationPolicy_js_1.serializationPolicy;
    } });
    Object.defineProperty(exports, "serializationPolicyName", { enumerable: true, get: function() {
      return serializationPolicy_js_1.serializationPolicyName;
    } });
    var authorizeRequestOnClaimChallenge_js_1 = requireAuthorizeRequestOnClaimChallenge();
    Object.defineProperty(exports, "authorizeRequestOnClaimChallenge", { enumerable: true, get: function() {
      return authorizeRequestOnClaimChallenge_js_1.authorizeRequestOnClaimChallenge;
    } });
    var authorizeRequestOnTenantChallenge_js_1 = requireAuthorizeRequestOnTenantChallenge();
    Object.defineProperty(exports, "authorizeRequestOnTenantChallenge", { enumerable: true, get: function() {
      return authorizeRequestOnTenantChallenge_js_1.authorizeRequestOnTenantChallenge;
    } });
  })(commonjs);
  return commonjs;
}
export {
  requireCommonjs as r
};
